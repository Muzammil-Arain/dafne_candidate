export const formatCurrency = (value, currency = 'USD') => {
  const cleaned = value.replace(/[^0-9]/g, '');

  if (!cleaned) return '';

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(cleaned);
};


