export const isUserLoggedIn = () => {
    return !!localStorage.getItem('userId');
  };
  