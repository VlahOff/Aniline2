export const errorParser = (error) => {
  let message = '';
  switch (error) {
    case 'SUCCESSFULLY_REGISTERED':
      message = 'We\'ve sent you an email, please verify your account. The email may end up in spam.';
      break;
    case 'ACCOUNT_NOT_VERIFIED':
      message = 'Please verify your account to continue, we\'ve sent you an email.';
      break;
    case 'PASSWORD_CHANGED':
      message = 'Password changed successfully.';
      break;
    case 'ACCOUNT_DELETED_SUCCESSFULLY':
      message = 'Your account has been removed successfully.';
      break;
    case 'EMAIL_PASSWORD_RESET_SENT':
      message = 'Email was sent.';
      break;
    case 'TICKET_EXPIRED':
      message = 'Reset password ticket has expired, send a new request.';
      break;
    case 'EMAIL_TAKEN':
      message = 'This email is taken.';
      break;
    case 'USERNAME_TAKEN':
      message = 'This username is taken.';
      break;
    case 'INVALID_CREDENTIALS':
      message = 'Invalid email or password.';
      break;
    case 'Too Many Requests':
      message = 'Too Many Requests.';
      break;
    case 'NO_USER':
      message = 'You have to be logged in!';
      break;
    case 'INVALID_TOKEN':
      message = 'User token is invalid!';
      break;

    default:
      message = error.message || 'An error has occurred!';
      break;
  }
  
  return message;
};
