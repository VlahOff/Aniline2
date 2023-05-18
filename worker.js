self.onmessage = (event) => {
  const { input, map } = event.data;
  
  const result = map.filter(r => {
    return r.name.toLowerCase().includes(input.toLowerCase())
    || r.symbol.toLowerCase().includes(input.toLowerCase());
  });
  
  self.postMessage(result);
};