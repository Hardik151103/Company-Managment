
export const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!tokenExpiration) {
      return true;
    }
    const currentTime = new Date().getTime();
    return currentTime > tokenExpiration;
  };
  