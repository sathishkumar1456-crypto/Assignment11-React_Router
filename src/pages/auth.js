

export const loginUser = (userData) => {
  localStorage.setItem('gymUser', JSON.stringify(userData));
};

export const logoutUser = () => {
  localStorage.removeItem('gymUser');
  window.location.href = '/users'; // Redirect to login
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('gymUser');
  return user ? JSON.parse(user) : null;
};