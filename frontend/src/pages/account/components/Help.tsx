import React, { useState } from 'react';
import { FaArrowLeft, FaPhone, FaWhatsapp, FaFacebookMessenger, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

interface HelpProps {
  onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ onBack }) => {
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email sending - in real app, this would call an API
    setTimeout(() => {
      alert('Your message has been sent! We\'ll get back to you soon.');
      setEmailForm({ subject: '', message: '', email: '', name: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactOptions = [
    {
      id: 'phone',
      label: 'Phone Support',
      icon: FaPhone,
      value: '+1 (555) 123-4567',
      description: 'Call us for immediate assistance',
      action: () => window.open('tel:+15551234567'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: FaWhatsapp,
      value: '+1 (555) 123-4567',
      description: 'Chat with us on WhatsApp',
      action: () => window.open('https://wa.me/15551234567'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'messenger',
      label: 'Facebook Messenger',
      icon: FaFacebookMessenger,
      value: '@themallsupport',
      description: 'Message us on Facebook',
      action: () => window.open('https://m.me/themallsupport'),
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">Help & Support</h1>
        </div>

        {/* Contact Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  className={`${option.color} text-white p-6 rounded-lg transition-colors text-center hover:shadow-lg`}
                >
                  <IconComponent className="mx-auto text-3xl mb-3" />
                  <h3 className="font-semibold mb-1">{option.label}</h3>
                  <p className="text-sm opacity-90 mb-2">{option.value}</p>
                  <p className="text-xs opacity-75">{option.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y divide-stone-200">
            <div className="p-4">
              <h3 className="font-medium text-stone-800 mb-2">How do I update my account information?</h3>
              <p className="text-stone-600 text-sm">
                Go to Account → Manage Account → Personal Info to update your details.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-stone-800 mb-2">How do I add a new address?</h3>
              <p className="text-stone-600 text-sm">
                Navigate to Account → My Addresses and click "Add Address" to add a new delivery location.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-stone-800 mb-2">Where can I view my order history?</h3>
              <p className="text-stone-600 text-sm">
                Check Account → My Purchases → My Orders to see all your past orders.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-stone-800 mb-2">How do I change my password?</h3>
              <p className="text-stone-600 text-sm">
                Go to Account → Manage Account → Security to update your password.
              </p>
            </div>
          </div>
        </div>

        {/* Email Support Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
            <FaEnvelope className="mr-2" />
            Send us a Message
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            Can't find what you're looking for? Send us a detailed message and we'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Message
              </label>
              <textarea
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="Please provide as much detail as possible about your issue or question..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Response Time:</strong> We typically respond to support emails within 24 hours during business days.
              For urgent matters, please use our phone or WhatsApp support.
            </p>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg">
              <h4 className="font-medium text-stone-800 mb-2">User Guide</h4>
              <p className="text-stone-600 text-sm mb-3">
                Learn how to make the most of our platform
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Guide →
              </button>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg">
              <h4 className="font-medium text-stone-800 mb-2">Community Forum</h4>
              <p className="text-stone-600 text-sm mb-3">
                Connect with other users and get help
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Join Forum →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;