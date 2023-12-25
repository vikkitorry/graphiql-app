export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

export const validatePassword = async (_: unknown, value: string) => {
  if (!/[A-zА-я]/.test(value)) {
    await Promise.reject('Password must have 1 letter');
  } else if (value.length < 8) {
    await Promise.reject('Password must have minimum 8 chars');
  } else if (!/[!":?_;@#~`№$+\-\=,./%^&*()]/.test(value)) {
    await Promise.reject('Password must contain 1 special character');
  } else if (!/(?=.*\d)/.test(value)) {
    await Promise.reject('Password must contain 1 digit');
  } else if (value.length === 0) {
    await Promise.reject('Password is required!');
  }
  return await Promise.resolve();
};
