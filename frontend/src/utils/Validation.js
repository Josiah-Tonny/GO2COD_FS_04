export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return strongPasswordRegex.test(password);
  };
  
  export const validateRegistration = (username, email, password) => {
    const errors = {};
  
    if (!username || username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }
  
    if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and number';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  