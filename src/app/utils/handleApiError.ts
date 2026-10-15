import { AxiosError } from 'axios';

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ошибка запроса',
): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data?.message || fallback;
    }
    if (error.request) {
      return 'Нет соединения с сервером';
    }
    return 'Неизвестная ошибка';
  }
  return 'Неизвестная ошибка';
}