export const translationData = {
  en: {
    main: 'Main',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    welcome: 'Welcome',
  },
  ru: {
    main: 'Главная',
    signIn: 'Войти',
    signOut: 'Выйти',
    signUp: 'Зарегестрироваться',
    email: 'Почта',
    password: 'Пароль',
    welcome: 'Добро пожаловать',
  },
};

export const translationErrorsData = {
  en: {
    auth: '!!!ТЕКСТ ERROR',
  },
  ru: {
    auth: '!!ТЕКСТ ОШИБКИ',
  },
};

//helper (after develop will delete)
// function findKeyDifference<T extends Record<string, string>>(en: T, ru: T): string[] {
//   const keys1 = Object.keys(en);
//   const keys2 = Object.keys(ru);

//   const uniqueKeys1 = keys1.filter((key) => !keys2.includes(key));
//   const uniqueKeys2 = keys2.filter((key) => !keys1.includes(key));

//   return [...uniqueKeys1, ...uniqueKeys2];
// }

// console.log(findKeyDifference(translationData.en, translationData.ru));
