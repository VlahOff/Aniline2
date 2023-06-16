export const validateUsername = username => {
	return username.trim().length >= 3 && username.trim().length <= 30;
};
