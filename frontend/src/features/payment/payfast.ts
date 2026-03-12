import { API_URL } from '../context';

export interface PayFastPaymentParams {
  orderId: string;
  amount: number;
  email: string;
  description: string;
  paymentType: 'subscription' | 'payment' | 'premium';
}

/**
 * Initiates a PayFast payment by creating a payment session and redirecting to PayFast
 * @param params - Payment parameters including orderId, amount, email, description, and paymentType
 * @returns Promise<void> - Resolves when the redirect is initiated
 */
export const initiatePayFastPayment = async (params: PayFastPaymentParams): Promise<void> => {
  const { orderId, amount, email, description, paymentType } = params;

  const res = await fetch(`${API_URL}/api/payments/payfast/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      amount,
      email,
      description,
      paymentType,
    }),
  });

  const data = await res.json();

  // Create a form and submit it to redirect to PayFast
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = data.paymentUrl;

  Object.entries(data.paymentData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

/**
 * Initiates a premium store subscription payment
 * @param storeId - The store ID to upgrade to premium
 * @param userEmail - The user's email address
 */
export const initiatePremiumUpgrade = async (storeId: string, userEmail: string): Promise<void> => {
  await initiatePayFastPayment({
    orderId: storeId,
    amount: 29.0, // Premium monthly price
    email: userEmail,
    description: 'Premium Store Subscription',
    paymentType: 'premium',
  });
};
