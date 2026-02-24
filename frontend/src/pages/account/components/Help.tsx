import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaFacebookMessenger, FaEnvelope, FaPaperPlane, FaQuestionCircle, FaBook, FaUsers } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

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
      gradient: 'from-blue-500 to-cyan-600',
      shadowColor: 'shadow-blue-200/50'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: FaWhatsapp,
      value: '+1 (555) 123-4567',
      description: 'Chat with us on WhatsApp',
      action: () => window.open('https://wa.me/15551234567'),
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-200/50'
    },
    {
      id: 'messenger',
      label: 'Messenger',
      icon: FaFacebookMessenger,
      value: '@themallsupport',
      description: 'Message us on Facebook',
      action: () => window.open('https://m.me/themallsupport'),
      gradient: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-200/50'
    }
  ];

  const faqs = [
    {
      question: 'How do I update my account information?',
      answer: 'Go to Account → Manage Account → Personal Info to update your details.'
    },
    {
      question: 'How do I add a new address?',
      answer: 'Navigate to Account → My Addresses and click "Add Address" to add a new delivery location.'
    },
    {
      question: 'Where can I view my order history?',
      answer: 'Check Account → My Purchases → My Orders to see all your past orders.'
    },
    {
      question: 'How do I change my password?',
      answer: 'Go to Account → Manage Account → Security to update your password.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pb-[6vh]">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoChevronBackOutline className='text-white text-xl'/>
            </button>
            <h1 className="text-xl font-semibold text-white">Help & Support</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {contactOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={option.action}
                className={`bg-gradient-to-br ${option.gradient} rounded-2xl p-4 text-white text-center shadow-lg ${option.shadowColor} hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]`}
              >
                <IconComponent className="mx-auto text-2xl mb-2" />
                <h3 className="font-semibold text-sm mb-0.5">{option.label}</h3>
                <p className="text-[10px] opacity-80 line-clamp-1">{option.value}</p>
              </button>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaQuestionCircle className="text-indigo-600" />
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-500 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Support Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200/50">
              <FaEnvelope className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Send us a Message</h2>
              <p className="text-gray-500 text-xs">We'll respond within 24 hours</p>
            </div>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Message
              </label>
              <textarea
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all resize-none"
                rows={5}
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-200/50">
              <FaBook className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">User Guide</h4>
            <p className="text-gray-500 text-xs mb-3">Learn how to make the most of our platform</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Guide →
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-200/50">
              <FaUsers className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Community Forum</h4>
            <p className="text-gray-500 text-xs mb-3">Connect with other users and get help</p>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Join Forum →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
