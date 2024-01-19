
// function to change curreny format
export function numberFormat(value){
  let pricevalue= new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'INR'
 }).format(value)
 return pricevalue
}

// function to change from numbers to words
export function numInLakh(value) {
  var val = Math.abs(value)
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2) + ' L';
  }
  return val;
}

// function to change from numbers to INR standard
export function priceFormat(item) {
  let value = item?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
   return value;
}