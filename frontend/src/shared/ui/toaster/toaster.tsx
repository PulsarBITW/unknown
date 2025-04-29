import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@shared/ui/toast';

import {useToast} from './useToast';

import styles from './toaster.module.css';

export function Toaster() {
  const {toasts} = useToast();

  return (
    <ToastProvider>
      {toasts.map(({id, title, description, action, ...props}) => (
        <Toast key={id} {...props}>
          <div className={styles['toast-flex']}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
