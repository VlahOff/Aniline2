export const validatePassword = password => {
	const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return passwordReg.test(password?.trim());
};
