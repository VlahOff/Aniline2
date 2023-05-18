self.onmessage = (event) => {
  const { input, cryptoMap } = event.data;

  const result = cryptoMap.filter(r => {
    return r.name.toLowerCase().includes(input.toLowerCase())
      || r.symbol.toLowerCase().includes(input.toLowerCase());
  });

  self.postMessage(result);
};