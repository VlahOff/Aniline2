export const priceParser = (price) => {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 10,
    minimumFractionDigits: 2
  });

  return usDollar.format(price);
};