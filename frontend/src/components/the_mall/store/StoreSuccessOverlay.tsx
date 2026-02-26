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
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/60 via-black/50 to-slate-800/40 backdrop-blur-md"
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-[92%] max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Gradient top bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-violet-500" />

        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
        >
          <IoCloseSharp size={22} />
        </button>

        <div className="p-10 text-center">
          {/* Success icon with confetti-like effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            <GiCheckMark size={48} className="text-white drop-shadow-md" />
          </motion.div>

          {/* Confetti particles */}
          <div className="relative">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  x: Math.cos(i * 30 * Math.PI / 180) * (60 + Math.random() * 40),
                  y: Math.sin(i * 30 * Math.PI / 180) * (60 + Math.random() * 40),
                  opacity: 0,
                  scale: 1
                }}
                transition={{ 
                  delay: 0.5 + i * 0.03, 
                  duration: 1, 
                  ease: 'easeOut' 
                }}
                className={`absolute left-1/2 top-0 h-3 w-3 rounded-full ${
                  ['bg-emerald-400', 'bg-teal-500', 'bg-violet-500', 'bg-amber-400', 'bg-rose-400'][i % 5]
                }`}
                style={{ 
                  transform: 'translate(-50%, -50%)',
                  marginLeft: 'calc(50% - 6px)',
                  marginTop: '-6px'
                }}
              />
            ))}
          </div>

          {/* Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4 text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
          >
            Store Created!
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto mb-8 text-gray-600 leading-relaxed"
          >
            <span className="font-semibold text-gray-900">{store?.name ?? 'Your store'}</span> is ready to go! 🎉
            <br />
            Get our <span className="font-medium text-emerald-600">pre-launch deal</span> for just{' '}
            <span className="font-bold text-gray-900">R25</span> and unlock your full dashboard access.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={handleButtonClick}
              className="
                group relative w-full overflow-hidden rounded-xl px-8 py-4 font-semibold text-white
                bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500
                shadow-lg shadow-emerald-500/25
                transition-all duration-300
                hover:shadow-xl hover:shadow-emerald-500/40
                hover:scale-[1.02]
                active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Pay Now & Access Dashboard
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 transition-transform duration-500 group-hover:translate-x-0" />
            </button>

            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe later, take me to homepage
            </button>
          </motion.div>
        </div>

        {/* Bottom decorative bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-violet-500" />
      </motion.div>
    </motion.div>
  )
}

export default StoreSuccessOverlay
