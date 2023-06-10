export const usdPriceParser = (price) => {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 1 ? 2 : 10,
  });

  return usDollar.format(price);
};

export const priceParser = (price) => {
  const usDollar = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 1 ? 2 : 10,
  });

  return usDollar.format(price);
};
