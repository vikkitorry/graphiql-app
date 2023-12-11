export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

export const validatePassword = async (_: unknown, value: string) => {
  if (!/[a-zA-Z]/.test(value)) {
    await Promise.reject('Password must have 1 letter');
  } else if (value.length < 8) {
    await Promise.reject('Password must have minimum 8 chars');
  } else if (!/[!@#$%^&*()]/.test(value)) {
    await Promise.reject('Password must contain 1 special character');
  } else if (!/\d/.test(value)) {
    await Promise.reject('Password must contain 1 digit');
  }
  return await Promise.resolve();
};
