import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({ message, type, isVisible, onClose }: NotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm ${
              type === 'success'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            {type === 'success' ? (
              <IoCheckmarkCircle className="text-2xl" />
            ) : (
              <IoCloseCircle className="text-2xl" />
            )}
            <p className="font-medium">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 hover:opacity-80 transition-opacity"
            >
              <IoCloseCircle className="text-lg" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;