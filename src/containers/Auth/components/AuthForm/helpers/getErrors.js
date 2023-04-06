const checkEmail = (email) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailReg.test(email)) {
    return [{ title: 'Email', field: 'email', message: 'invalid email address' }];
  }

  return [];
};

const checkLogin = ({ email, password }) => {
  const result = [];

  result.push(...checkEmail(email));

  if (!password.length) {
    result.push({ title: 'Password', field: 'password', message: 'Invalid password' });
  }

  return result;
};

const checkRegistration = ({ email, password, confirmPassword }) => {
  const result = [];

  result.push(...checkEmail(email));

  if (password.length < 8) {
    result.push({ title: 'Password', field: 'password', message: 'Use 8 characters or more for your password' });
  }
  if (confirmPassword.length && confirmPassword !== password) {
    result.push({ title: 'Passwords', field: 'confirmPassword', message: 'Passwords do not match' });
  }

  return result;
};

export const getErrors = (formData, isLogin) => {
  return isLogin ? checkLogin(formData) : checkRegistration(formData);
};
