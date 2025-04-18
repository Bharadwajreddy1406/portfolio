import toast, { Toast, ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'custom';

// Default options that can be overridden
const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-right',
};

/**
 * Show a success toast notification
 */
export const showSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Show an error toast notification
 */
export const showError = (message: string, options?: ToastOptions) => {
  return toast.error(message, { ...defaultOptions, ...options });
};

/**
 * Show a loading toast notification
 */
export const showLoading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, { ...defaultOptions, ...options });
};

/**
 * Dismiss a specific toast by ID
 */
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

/**
 * Update an existing toast (useful for changing loading -> success/error)
 */
export const updateToast = (
  toastId: string, 
  message: string, 
  type: ToastType,
  options?: ToastOptions
) => {
  switch (type) {
    case 'success':
      toast.success(message, { ...defaultOptions, ...options, id: toastId });
      break;
    case 'error':
      toast.error(message, { ...defaultOptions, ...options, id: toastId });
      break;
    case 'loading':
      toast.loading(message, { ...defaultOptions, ...options, id: toastId });
      break;
    case 'custom':
      toast(message, { ...defaultOptions, ...options, id: toastId });
      break;
  }
};