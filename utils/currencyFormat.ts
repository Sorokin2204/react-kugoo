export const currencyFormat = (price: number) => {
  return price ? formatNumber(price) : '';
};

export const formatNumber = (num: number) => {
  var array = num.toString().split('');
  var index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ' ');
    index -= 4;
  }
  return array.join('') + ' ₽';
};
