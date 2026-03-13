import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../context';

// Define protected routes that require authentication
// Token refresh will only be attempted for these routes
const PROTECTED_ROUTES = [
  '/api/user/',
  '/api/admin/',
  '/api/dashboard/',
  '/api/orders/',
  '/api/settings/',
];

// Define public routes that don't require token refresh on 401
const PUBLIC_ROUTES = [
  '/api/user/login',
  '/api/user/register',
  '/api/user/refresh-token',
  '/api/stores/public',
];

// Check if the request URL is a protected route
const isProtectedRoute = (url: string): boolean => {
  // First check if it's explicitly a public route
  const isPublicRoute = PUBLIC_ROUTES.some((route) => url.includes(route));
  if (isPublicRoute) {
    return false;
  }

  // Then check if it matches any protected route pattern
  return PROTECTED_ROUTES.some((route) => url.includes(route));
};

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for cookie-based authentication
});

// Also configure the default axios instance for backward compatibility
// This ensures all direct axios imports also get the interceptor
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

// Track if we're currently refreshing the token
let isRefreshing = false;

// Queue of failed requests waiting for token refresh
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor - handle 401 errors and token refresh
const setupInterceptors = () => {
  // Response interceptor for api instance
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // If error is 401 and we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Only attempt token refresh for protected routes
        if (!isProtectedRoute(originalRequest.url || '')) {
          return Promise.reject(error);
        }

        // If already refreshing, queue the request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // Retry the original request
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        // Mark request as retried and start refreshing
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Call the refresh token endpoint
          await api.post('/api/user/refresh-token', {}, {
            withCredentials: true,
          });

          // Token refreshed successfully, process queued requests
          processQueue(null, 'refreshed');

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, process queue with error
          processQueue(refreshError as Error, null);

          // Optionally dispatch logout
          window.dispatchEvent(new CustomEvent('auth:logout'));

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  // Also add interceptor to the default axios instance for backward compatibility
  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // If error is 401 and we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Only attempt token refresh for protected routes
        if (!isProtectedRoute(originalRequest.url || '')) {
          return Promise.reject(error);
        }

        // If already refreshing, queue the request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              // Retry the original request
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        // Mark request as retried and start refreshing
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Call the refresh token endpoint using the default axios
          await axios.post(`${API_URL}/api/user/refresh-token`, {}, {
            withCredentials: true,
          });

          // Token refreshed successfully, process queued requests
          processQueue(null, 'refreshed');

          // Retry the original request
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed, process queue with error
          processQueue(refreshError as Error, null);

          // Optionally dispatch logout
          window.dispatchEvent(new CustomEvent('auth:logout'));

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// Initialize the interceptors
setupInterceptors();

export default api;
