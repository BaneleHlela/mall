import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { sendEmail, resetState } from '../../../../../../features/emails/emailSlice';
import { TbLoader3 } from "react-icons/tb";
import { getBackgroundStyles,  getTextStyles } from '../../../../../../utils/stylingFunctions';

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

const ElegantSendEmailForm: React.FC<SendEmailFormProps> = ({style}) => {
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
    <div 
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className="flex flex-col justify-center min-h-fit"
    >
      {style.text.title.show && (
          <h2 
            style={{
              ...getTextStyles(style.text.title),
              fontSize: window.innerWidth < 1024 ? style.text.title.fontSize.mobile : style.text.title.fontSize.desktop,
            }}
            className={`w-full mb-5
              ${style.text.title.position === 'center' && 'text-center'}
              ${style.text.title.position === 'start' && 'text-start'}
              ${style.text.title.position === 'end' && 'text-end'}
              `}
          >
            {style.text.title.input || "Send a message"}
          </h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 capitalize">
        <div className="flex flex-col lg:flex-row gap-3">
          {['firstName', 'lastName'].map((field) => (
            <div key={field} className="w-full"
              style={{
                ...getTextStyles(style.text.senderInfo),
              }}
            >
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
                style={{
                  borderBottom: `${style.background.senderInfo.border.width} ${style.background.senderInfo.border.style} ${style.background.senderInfo.border.color}`,
                  borderRadius: style.background.senderInfo.border.radius,
                }}
                className="mt-1 block w-full p-2 focus:bg-[#ffffff30] focus:bg-opacity-30 focus:outline-none focus:ring-0 focus:border-none"
              />
            </div>
          ))}
        </div>

        {/* Other fields */}
        {['email', 'message', 'phone'].map((field) => (
          <div key={field}
            style={{
              ...getTextStyles(style.text.senderInfo),
            }}
          >
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
                style={{
                  borderBottom: `${style.background.senderInfo.border.width} ${style.background.senderInfo.border.style} ${style.background.senderInfo.border.color}`,
                  borderRadius: style.background.senderInfo.border.radius,
                }}
                className="mt-1 h-[15vh] block w-full p-2 focus:bg-[#ffffff11] focus:bg-opacity-30 focus:outline-none focus:ring-0 focus:border-none"
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'tel'}
                id={field}
                name={field}
                value={formData[field as keyof SendEmailFormData]}
                onChange={handleChange}
                required
                style={{
                  borderBottom: `${style.background.senderInfo.border.width} ${style.background.senderInfo.border.style} ${style.background.senderInfo.border.color}`,
                  borderRadius: style.background.senderInfo.border.radius,
                }}
                className="mt-1 block w-full p-2 focus:bg-[#ffffff2a] focus:bg-opacity-30 focus:outline-none focus:ring-0 focus:border-none"
              />
            )}
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
        <div className={`
          w-full flex flex-row mt-2 lg:mt-8
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
            className="text-center "
          >
            {emailState.isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : `${style.submitButton.text.input || "Submit"} `}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElegantSendEmailForm;
