type FirebaseErrorMessage = {
  en: string;
  ru: string;
};

export const handleFirebaseError = (error: Error): FirebaseErrorMessage => {
  switch (error.message) {
    case 'auth/invalid-credential':
      return {
        en: 'Invalid email or password.',
        ru: 'Неверный логин или пароль.',
      };
    case 'auth/user-not-found':
      return {
        en: 'Could not find user. Do you have an account?',
        ru: 'Пользователь не найден. У вас уже есть аккаунт?',
      };
    case 'auth/email-already-in-use':
      return {
        en: 'This email is already in use.',
        ru: 'Пользователь с данной почтой уже зарегистрирован.',
      };
    case 'auth/too-many-requests':
      return {
        en: 'Too many requests. Please try again later.',
        ru: 'Слишком много запросов. Попробуйте чуть позже.',
      };
    default:
      return { en: 'Something wents wrong.', ru: 'Что-то пошло не так.' };
  }
};
