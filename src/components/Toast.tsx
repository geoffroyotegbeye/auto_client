"use client";

import { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-green-500/10 dark:bg-green-500/10 border-green-500/20 dark:border-green-500/20 text-green-600 dark:text-green-400',
    error: 'bg-red-500/10 dark:bg-red-500/10 border-red-500/20 dark:border-red-500/20 text-red-600 dark:text-red-400',
    info: 'bg-blue-500/10 dark:bg-blue-500/10 border-blue-500/20 dark:border-blue-500/20 text-blue-600 dark:text-blue-400',
    warning: 'bg-orange-500/10 dark:bg-orange-500/10 border-orange-500/20 dark:border-orange-500/20 text-orange-600 dark:text-orange-400',
  };

  const icons = {
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
    info: 'InformationCircleIcon',
    warning: 'ExclamationTriangleIcon',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg border ${styles[type]} animate-slide-in-right shadow-lg min-w-[300px] max-w-md`}
    >
      <Icon name={icons[type] as any} size={20} className="flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <Icon name="XMarkIcon" size={16} />
      </button>
    </div>
  );
}
