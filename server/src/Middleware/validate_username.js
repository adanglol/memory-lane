function validateUsername(username){
  const minLength = 3;
  const maxLength = 20;
  const usernamePattern = /^(?!.*__.*)(?!.*\.\..*)[a-zA-Z0-9._]{3,20}$/;
  
  return username.length >= minLength &&
         username.length <= maxLength &&
         usernamePattern.test(username);
}


module.exports = validateUsername;