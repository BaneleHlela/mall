import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { sendEmail, resetState } from '../../../../features/emails/emailSlice';
import { TbLoader3 } from "react-icons/tb";
import { getBackgroundStyles, getBorderStyles, getDivAnimation, getTextStyles } from '../../../../utils/stylingFunctions';
import { motion } from 'framer-motion';

interface SendEmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface SendEmailFormProps {
  style: any;
}

const SendEmailForm: React.FC<SendEmailFormProps> = ({ style }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendEmail({ ...formData, senderEmail: formData.email, destinationEmail: "gizahlela@gmail.com" }));
  };

  useEffect(() => {
    if (emailState.successMessage) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setSuccessMessage(emailState.successMessage);
      dispatch(resetState());

      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [emailState.successMessage, dispatch]);

  return (
    <motion.div
      {...getDivAnimation(style.background.animation || "leftToright")}
      animate={{ y: 0, x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className="flex flex-col justify-center"
    >
      {style.text.title?.show && (
        <h2
          style={{
            ...getTextStyles(style.text.title),
            fontSize:
              window.innerWidth < 1024
                ? style.text.title.fontSize.mobile
                : style.text.title.fontSize.desktop,
          }}
          className={`w-full mb-5
            ${style.text.title.position === 'center' && 'text-center'}
            ${style.text.title.position === 'start' && 'text-start'}
            ${style.text.title.position === 'end' && 'text-end'}
          `}
        >
          {style.text.title.input || 'Send a message'}
        </h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 capitalize">
        {/* First and Last Name side by side */}
        <div className="flex flex-col lg:flex-row gap-3">
          {['firstName', 'lastName'].map((field) => (
            <div key={field} className="w-full" style={{ ...getTextStyles(style.text.senderInfo) }}>
              <label
                htmlFor={field}
                className={`block
                  ${style.text.senderInfo.position === 'center' && 'text-center'}
                  ${style.text.senderInfo.position === 'start' && 'text-start'}
                  ${style.text.senderInfo.position === 'end' && 'text-end'}
                `}
              >
                {field.replace(/([A-Z])/, ' $1')} *
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field as keyof SendEmailFormData]}
                onChange={handleChange}
                required
                style={{ ...getBorderStyles(style.background.senderInfo.border) }}
                className="mt-1 block w-full p-2"
              />
            </div>
          ))}
        </div>

        {/* Email, Phone, and Message fields */}
        {['email', 'phone', 'message'].map((field) => (
          <div key={field} style={{ ...getTextStyles(style.text.senderInfo) }}>
            <label
              htmlFor={field}
              className={`block
                ${style.text.senderInfo.position === 'center' && 'text-center'}
                ${style.text.senderInfo.position === 'start' && 'text-start'}
                ${style.text.senderInfo.position === 'end' && 'text-end'}
              `}
            >
              {field.replace(/([A-Z])/, ' $1')} *
            </label>
            {field === 'message' ? (
              <textarea
                id={field}
                name={field}
                value={formData[field as keyof SendEmailFormData]}
                onChange={handleChange}
                required
                style={{ ...getBorderStyles(style.background.senderInfo.border) }}
                className="mt-1 block w-full p-2 h-[130px]"
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'tel'}
                id={field}
                name={field}
                value={formData[field as keyof SendEmailFormData]}
                onChange={handleChange}
                required
                style={{ ...getBorderStyles(style.background.senderInfo.border) }}
                className="mt-1 block w-full p-2"
              />
            )}
          </div>
        ))}

        {/* Success / Error messages */}
        <div>
          {emailState.errorMessage && (
            <p className="text-red-600 text-sm text-center">{emailState.errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}
        </div>

        {/* Submit button */}
        <div
          className={`w-full flex flex-row mt-2 lg:mt-8
            ${style.submitButton.position === 'center' && 'justify-center'}
            ${style.submitButton.position === 'start' && 'justify-start'}
            ${style.submitButton.position === 'end' && 'justify-end'}
          `}
        >
          <button
            type="submit"
            style={{
              ...getTextStyles(style.submitButton.text),
              ...getBackgroundStyles(style.submitButton.background),
            }}
            className="text-center"
          >
            {emailState.isLoading ? (
              <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              style.submitButton.text.input || 'Submit'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SendEmailForm;
