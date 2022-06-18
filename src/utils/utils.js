export function formatNumber(numero) {
  return new Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(numero);
}
