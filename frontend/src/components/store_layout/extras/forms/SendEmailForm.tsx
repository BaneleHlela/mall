import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { sendEmail, resetState } from '../../../../features/emails/emailSlice';
import { TbLoader3 } from "react-icons/tb";

interface SendEmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const SendEmailForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const emailState = useAppSelector((state) => state.email);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<SendEmailFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  console.log("Form Data:", formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendEmail({...formData, senderEmail: formData.email, destinationEmail: "gizahlela@gmail.com"}));
  };

  // Reset form and state when success message is present
  useEffect(() => {
    if (emailState.successMessage) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        phone: '',
      });
      setSuccessMessage(emailState.successMessage);
      dispatch(resetState());
  
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); 
  
      return () => clearTimeout(timer); 
    }
  }, [emailState.successMessage, dispatch, successMessage]);
  

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Get a Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4 capitalize">
        {['firstName', 'lastName', 'email', "message", 'phone'].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
              {field.replace(/([A-Z])/, ' $1')} *
            </label>
            <input
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              id={field}
              name={field}
              value={formData[field as keyof SendEmailFormData]}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <div className="">

        </div>
        {/* Handle error and success */}
        <div className="">
          {emailState.errorMessage && (
            <p className="text-red-600 text-sm text-center">{emailState.errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {emailState.isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : "Request a free quote"}
        </button>
      </form>
    </div>
  );
};

export default SendEmailForm;
