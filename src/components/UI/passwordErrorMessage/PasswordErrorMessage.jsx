const PasswordErrorMessage = () => {
  return (
    <div>
      <p>Password must contain</p>
      <p>one uppercase</p>
      <p>one lowercase</p>
      <p>one number</p>
      <p>and must be at least 8 characters long.</p>
    </div>
  );
};

export default PasswordErrorMessage;