import { IoCloseSharp } from 'react-icons/io5'
import { GiCheckMark } from 'react-icons/gi'
import { useAppSelector } from '../../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface StoreSuccessOverlayProps {
  onClose: () => void
}

const StoreSuccessOverlay: React.FC<StoreSuccessOverlayProps> = ({ onClose }) => {
  const store = useAppSelector((state) => state.stores.currentStore);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate()

  const handleButtonClick = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/payfast/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: store?._id,
        amount: 25.0,
        email: user?.email,
        description: `Pre-launch deal payment for store ${store?.name}`,
        paymentType: 'subscription',
      }),
    });

    const data = await res.json();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.paymentUrl;
  
    Object.entries(data.paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative w-[92%] max-w-xl rounded-xl bg-white p-8 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black transition"
        >
          <IoCloseSharp size={22} />
        </button>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-gray-200"
        >
          <GiCheckMark size={56} className="text-black" />
        </motion.div>

        {/* Text */}
        <h2 className="mb-3 text-center text-3xl font-semibold tracking-tight">
          Store Created 🎉
        </h2>

        <p className="mx-auto max-w-md text-center text-gray-600 leading-relaxed">
          Congratulations!{' '}
          <span className="font-semibold text-black">
            {store?.name ?? 'Your store'}
          </span>{' '}
          has been created.
          <br />
          <br />
          Take advantage of our <span className="font-medium text-black">pre-launch deal</span> and get
          full access for just <span className="font-semibold text-black">R25</span>.
          After payment, you’ll unlock your dashboard to customize your store,
          add products or services, and prepare for launch day.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleButtonClick}
            className="
              relative rounded-xl px-8 py-3 font-semibold text-white
              bg-black
              shadow-[0_0_0_0_rgba(0,0,0,0)]
              transition-all duration-300
              hover:shadow-[0_0_30px_-6px_rgba(0,0,0,0.8)]
              hover:scale-[1.03]
              active:scale-[0.97]
              focus:outline-none
            "
          >
            Pay Now & Access Dashboard
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StoreSuccessOverlay
