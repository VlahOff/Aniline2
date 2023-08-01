export const percentParser = percentage => {
	return `${Number(percentage).toFixed(2) || 0}%`;
};
