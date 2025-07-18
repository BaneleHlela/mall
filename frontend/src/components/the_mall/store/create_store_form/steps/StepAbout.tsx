import React from 'react';
import { useFormContext } from '../context/FormContext';

const StepAbout: React.FC = () => {
  const { form, handleChange } = useFormContext();
  return (
    <div className='w-full h-full flex flex-col justify-between text-[2vh]'>
      <p className="text-[2.5vh] text-center">About Your Store</p>
      <textarea
        placeholder={`Write a brief story about your store, what makes it special, and what you offer.
        This will appear on your store’s About page and helps visitors connect with your brand. If you're just running a small hobby shop, you can skip this, but a good About section can really help if you plan to grow!`}
        value={form.about}
        onChange={e => handleChange('about', e.target.value)}
        className="w-full h-[80%] border-b bg-[#0000000e] focus:bg-[#00000030] focus:outline-none focus:ring-0 p-[.6vh]"
      />
    </div>
  );
};
export default StepAbout;
