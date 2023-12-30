export const handleApiError = (error: Response): Record<string, string> => {
  if (error.status === 400) {
    return { en: 'Bad request', ru: 'Неверный запрос' };
  }
  if (error.status === 401) {
    return { en: 'This API requires authorization', ru: 'Для данного API требуется авторизация' };
  }
  if (error.status === 403) {
    return { en: 'Access to the requested resource is forbidden', ru: 'Доступ к ресурсу запрещен' };
  }
  if (error.status === 404) {
    return { en: 'Resource not found', ru: 'Запрашиваемый ресурс не найден' };
  }
  if (error.status.toString().match(/^5\d{2}$/)) {
    return { en: 'Something went wrong on our side', ru: 'Ошибка на сервере' };
  }
  return { en: 'Something went wrong', ru: 'Что-то пошло не так' };
};
