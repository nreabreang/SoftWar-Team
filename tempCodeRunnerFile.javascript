function getOddValues(arr) {
  var oddValues = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      oddValues.push(arr[i]);
    }
  }
  return oddValues;
}

let arr = [1, 4, 9, 13, 20, 5, 11];
console.log(getOddValues(arr));
