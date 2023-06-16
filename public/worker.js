self.onmessage = event => {
	const { input, map, message } = event.data;

	if (message === 'converter') {
		const result = map.filter(r => {
			return (
				r.name.toLowerCase().includes(input.toLowerCase()) ||
				r.symbol.toLowerCase().includes(input.toLowerCase())
			);
		});
		self.postMessage(result);
	} else if (message === 'portfolio') {
		const result = map.filter(c => {
			return (
				c.name.toLowerCase().startsWith(input.toLowerCase()) ||
				c.symbol.toLowerCase().startsWith(input.toLowerCase())
			);
		});
		self.postMessage(result);
	}
};
