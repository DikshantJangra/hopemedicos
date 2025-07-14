import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error';

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), duration - 500);
    const removeTimer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-white text-sm shadow-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Toast;
