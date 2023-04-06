import { useEffect, useRef, useState } from 'react';

export function useToast() {
  const INIT_STATE = { text: 'Success', type: 'success', isActive: false };

  const [toast, setToast] = useState(INIT_STATE);
  const isSuccess = toast.type === 'success';
  const timer = useRef();

  const stopToast = () => {
    clearTimeout(timer.current);
    setToast((prev) => ({ ...prev, isActive: false }));
  };

  const handleToast = (event) => {
    const { text, type } = event.detail;
    if (text) {
      clearTimeout(timer.current);
      setToast({ text, type, isActive: true });
      timer.current = setTimeout(
        () => {
          stopToast();
        },
        type === 'success' ? 2000 : 4000,
      );
    } else {
      stopToast();
    }
  };

  useEffect(() => {
    window.addEventListener('showToast', handleToast);
    return () => {
      window.removeEventListener('showToast', handleToast);
    };
  }, []);

  return { toast, isSuccess };
}
