// utils/alertUtils.ts
import Swal from 'sweetalert2';

export const showErrorAlert = async (
  title: string,
  message: string
): Promise<void> => {
  await Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0B5CAD',
  });
};

export const showSuccessAlert = async (
  title: string,
  message: string
): Promise<void> => {
  await Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0B5CAD',
  });
};

export const showLoadingAlert = (message: string = 'Please wait...'): void => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = (): void => {
  Swal.close();
};
