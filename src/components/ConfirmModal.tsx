"use client";

import Icon from '@/components/ui/AppIcon';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  type = 'danger',
}: ConfirmModalProps) {
  const styles = {
    danger: {
      icon: 'TrashIcon',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-400',
      button: 'bg-rose-500 hover:bg-rose-600',
    },
    warning: {
      icon: 'ExclamationTriangleIcon',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      button: 'bg-orange-500 hover:bg-orange-600',
    },
    info: {
      icon: 'InformationCircleIcon',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      button: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const style = styles[type];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-vm-dark-card border border-gray-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 animate-scale-in shadow-2xl">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center mb-4`}>
          <Icon name={style.icon as any} size={24} className={style.iconColor} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-vm-dark-lighter border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-vm-dark transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
