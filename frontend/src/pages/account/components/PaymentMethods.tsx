import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCreditCard, FaPaypal, FaStar, FaRegStar, FaCheck } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <IoChevronBackOutline className='text-white text-xl'/>
              </button>
              <h1 className="text-xl font-semibold text-white">Payment Methods</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              <FaPlus className="text-sm" />
              <span className="font-medium">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Payment Methods List */}
        {paymentMethods.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No payment methods yet</h3>
            <p className="text-gray-500 mb-6">Add your first payment method to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
            >
              <FaPlus />
              <span>Add Payment Method</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      method.type === 'card' 
                        ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-200/50' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-200/50'
                    }`}>
                      {method.type === 'card' ? (
                        <FaCreditCard className="text-white text-xl" />
                      ) : (
                        <FaPaypal className="text-white text-xl" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {method.name}
                        </h3>
                        {method.isDefault && (
                          <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-1">
                            <FaStar className="text-[10px]" />
                            Default
                          </span>
                        )}
                      </div>
                      {method.type === 'card' ? (
                        <div className="space-y-0.5">
                          <p className="text-gray-600 text-sm">{method.brand} •••• {method.last4}</p>
                          <p className="text-gray-400 text-xs">Expires {method.expiryDate}</p>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm">{method.email}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                          title="Set as default"
                        >
                          <FaRegStar className="text-lg" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePaymentMethod(method.id)}
                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete payment method"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> This is a visual representation only. Actual payment processing functionality 
            will be implemented once the payment gateway is selected.
          </p>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Payment Method</h2>
              <form onSubmit={handleAddPaymentMethod} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Payment Type
                  </label>
                  <select
                    value={newPaymentMethod.type}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value as 'card' | 'paypal' })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newPaymentMethod.name}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    placeholder="e.g., Personal Card, Work PayPal"
                    required
                  />
                </div>

                {newPaymentMethod.type === 'card' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Last 4 Digits
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          value={newPaymentMethod.last4}
                          onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, last4: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                          placeholder="1234"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Card Brand
                      </label>
                      <select
                        value={newPaymentMethod.brand}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, brand: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      >
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="Amex">American Express</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      value={newPaymentMethod.email}
                      onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPaymentMethod.isDefault}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, isDefault: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                  />
                  <span className="text-sm text-gray-600">Set as default payment method</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <FaCheck />
                    <span>Add Method</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
