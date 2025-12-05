import React, { useState } from 'react';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCreditCard, FaPaypal, FaStar } from 'react-icons/fa';

interface PaymentMethodsProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  name: string;
  last4?: string;
  expiryDate?: string;
  brand?: string;
  email?: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onBack }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Mock payment methods data - in real app, this would come from API
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Personal Card',
      last4: '4242',
      expiryDate: '12/25',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal Account',
      email: 'user@example.com',
      isDefault: false
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState<Partial<PaymentMethod>>({
    type: 'card',
    name: '',
    last4: '',
    expiryDate: '',
    brand: 'Visa',
    email: '',
    isDefault: false
  });

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const method: PaymentMethod = {
      id,
      type: newPaymentMethod.type || 'card',
      name: newPaymentMethod.name || '',
      last4: newPaymentMethod.last4,
      expiryDate: newPaymentMethod.expiryDate,
      brand: newPaymentMethod.brand,
      email: newPaymentMethod.email,
      isDefault: newPaymentMethod.isDefault || false
    };

    if (method.isDefault) {
      setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: false })));
    }

    setPaymentMethods(prev => [...prev, method]);
    setNewPaymentMethod({
      type: 'card',
      name: '',
      last4: '',
      expiryDate: '',
      brand: 'Visa',
      email: '',
      isDefault: false
    });
    setShowAddForm(false);
    alert('Payment method added successfully!');
  };

  const handleEditPaymentMethod = (id: string, updatedMethod: Partial<PaymentMethod>) => {
    setPaymentMethods(prev => prev.map(pm => 
      pm.id === id ? { ...pm, ...updatedMethod } : pm
    ));
    setEditingId(null);
    alert('Payment method updated successfully!');
  };

  const handleDeletePaymentMethod = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
      alert('Payment method deleted successfully!');
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
    alert('Default payment method updated!');
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-2">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-stone-600" />
            </button>
            <h1 className="text-2xl font-semibold text-stone-800">Payment Methods</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaPlus className="mr-2" />
            Add Method
          </button>
        </div>

        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Add Payment Method</h2>
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Payment Type
                </label>
                <select
                  value={newPaymentMethod.type}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value as 'card' | 'paypal' })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newPaymentMethod.name}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Personal Card, Work PayPal"
                  required
                />
              </div>

              {newPaymentMethod.type === 'card' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Last 4 Digits
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={newPaymentMethod.last4}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, last4: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newPaymentMethod.expiryDate}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Card Brand
                    </label>
                    <select
                      value={newPaymentMethod.brand}
                      onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, brand: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="Amex">American Express</option>
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    PayPal Email
                  </label>
                  <input
                    type="email"
                    value={newPaymentMethod.email}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="setDefault"
                  checked={newPaymentMethod.isDefault}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, isDefault: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="setDefault" className="text-sm text-stone-700">
                  Set as default payment method
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Payment Method
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaCreditCard className="mx-auto text-stone-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">No payment methods yet</h3>
              <p className="text-stone-500 mb-4">Add your first payment method to get started</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Payment Method
              </button>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div className="mr-4">
                      {method.type === 'card' ? (
                        <div className="text-2xl">{getCardIcon(method.brand || 'visa')}</div>
                      ) : (
                        <FaPaypal className="text-blue-600 text-2xl" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="text-lg font-semibold text-stone-800 mr-2">
                          {method.name}
                        </h3>
                        {method.isDefault && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <FaStar className="mr-1" size={10} />
                            Default
                          </span>
                        )}
                      </div>
                      {method.type === 'card' ? (
                        <div className="text-stone-600">
                          <p className="text-sm">{method.brand} •••• {method.last4}</p>
                          <p className="text-sm">Expires {method.expiryDate}</p>
                        </div>
                      ) : (
                        <p className="text-stone-600 text-sm">{method.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Set as default"
                      >
                        <FaStar />
                      </button>
                    )}
                    <button
                      onClick={() => setEditingId(method.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit payment method"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete payment method"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Note about functionality */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> This is a visual representation only. Actual payment processing functionality 
            will be implemented once the payment gateway is selected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;