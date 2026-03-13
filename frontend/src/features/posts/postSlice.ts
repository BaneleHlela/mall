import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';

const API_URL = '/api/posts';

interface PostState {
    posts: Record<string, {
        identifier: string;
        likes: {
            count: number;
            users: string[];
        };
        rating: {
            averageRating: number;
            numberOfRatings: number;
        };
    }>;
    reviews: Record<string, any[]>;
    isLoading: boolean;
    error: string | null;
    message?: string;
    isPostReviewModalOpen: boolean;
}

const initialState: PostState = {
    posts: {},
    reviews: {},
    isLoading: false,
    error: null,
    isPostReviewModalOpen: false,
};

// Get post stats (likes & rating)
export const getPostStats = createAsyncThunk(
    'posts/getStats',
    async (identifier: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${identifier}/stats`);
            return { identifier, data: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch post stats');
        }
    }
);

// Toggle like on post
export const togglePostLike = createAsyncThunk(
    'posts/toggleLike',
    async (identifier: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/${identifier}/like`);
            return { identifier, data: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to toggle like');
        }
    }
);

// Get post reviews
export const getPostReviews = createAsyncThunk(
    'posts/getReviews',
    async (identifier: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${identifier}/reviews`);
            return { identifier, data: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
        }
    }
);

// Create post review
export const createPostReview = createAsyncThunk(
    'posts/createReview',
    async ({ 
        identifier, 
        rating, 
        comment, 
        anonymous 
    }: { 
        identifier: string; 
        rating: number; 
        comment: string; 
        anonymous: boolean 
    }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/${identifier}/reviews`, { 
                rating, 
                comment, 
                anonymous 
            });
            return { identifier, data: response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create review');
        }
    }
);

// Delete post review
export const deletePostReview = createAsyncThunk(
    'posts/deleteReview',
    async ({ identifier, reviewId }: { identifier: string; reviewId: string }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/reviews/${reviewId}`);
            return { identifier, reviewId };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
        setPostReviewModalOpen: (state, action) => {
            state.isPostReviewModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get post stats
            .addCase(getPostStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPostStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts[action.payload.identifier] = {
                    identifier: action.payload.identifier,
                    likes: action.payload.data.likes,
                    rating: action.payload.data.rating,
                };
            })
            .addCase(getPostStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Toggle like
            .addCase(togglePostLike.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(togglePostLike.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts[action.payload.identifier] = {
                    identifier: action.payload.identifier,
                    likes: action.payload.data.likes,
                    rating: action.payload.data.rating || state.posts[action.payload.identifier]?.rating || { averageRating: 0, numberOfRatings: 0 },
                };
            })
            .addCase(togglePostLike.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get reviews
            .addCase(getPostReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPostReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews[action.payload.identifier] = action.payload.data;
            })
            .addCase(getPostReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create review
            .addCase(createPostReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPostReview.fulfilled, (state, action) => {
                state.isLoading = false;
                const identifier = action.payload.identifier;
                const existingReviews = state.reviews[identifier] || [];
                // Check if review already exists (update case)
                const existingIndex = existingReviews.findIndex(
                    (r: any) => r.user._id === action.payload.data.user._id || r.user === action.payload.data.user
                );
                if (existingIndex >= 0) {
                    existingReviews[existingIndex] = action.payload.data;
                } else {
                    state.reviews[identifier] = [action.payload.data, ...existingReviews];
                }
                // Also update post rating
                if (state.posts[identifier]) {
                    state.posts[identifier].rating = action.payload.data.post?.rating || state.posts[identifier].rating;
                }
            })
            .addCase(createPostReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Delete review
            .addCase(deletePostReview.fulfilled, (state, action) => {
                const { identifier, reviewId } = action.payload;
                state.reviews[identifier] = (state.reviews[identifier] || []).filter(
                    (r: any) => r._id !== reviewId
                );
            });
    },
});

export const { clearPostError, setPostReviewModalOpen } = postSlice.actions;
export const selectIsPostReviewModalOpen = (state: RootState) => state.posts.isPostReviewModalOpen;
export default postSlice.reducer;
