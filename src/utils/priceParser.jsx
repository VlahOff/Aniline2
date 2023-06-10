export const usdPriceParser = (price = 0) => {
  const itStartsWithZero = price?.toString().startsWith('0.');

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: itStartsWithZero ? 10 : undefined,
  });

  return priceFormatter.format(price);
};

export const priceParser = (price = 0) => {
  const itStartsWithZero = price?.toString().startsWith('0.');

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: itStartsWithZero ? 10 : undefined,
  });

  return priceFormatter.format(price);
};
