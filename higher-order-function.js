// 배열의 고차함수 메서드 만들기

// 고차함수란?
// 다른 함수를 전달 인자로 받거나 함수 실행의 결과를 함수로 반환하는 함수를 뜻한다

// Array.prototype.forEach 원리
function forEachFunction(arr, func) {
  for (let el of arr) {
    // arr 배열을 각각 한번씩 실행
    func(el); // 이 부분은 결국 console.log(el)랑 동일함
  }
}
const a = [1, 2, 3, 4];
forEachFunction(a, (el) => console.log(`forEachFunction : ${el}`));

// Array.prototype.some 원리
// 배열 안의 어떤 요소라도 주어진 조건을 통과하는지 테스트
function someFunction(arr, func) {
  for (let el of arr) {
    const result = func(el);
    if (result) return true;
  }
  return false;
}
const someA = [2, 4, 6, 8];
someFunction(someA, (el) => el % 2 === 1); // 모두 2로 나누면 나머지가 0이기에 모두 false를 반환
const someB = [2, 4, 6, 8, 9];
someFunction(someB, (el) => el % 2 === 1); // 9는 2로 나누면 나머지가 1이어서 true를 반환. if문에 걸림

// Array.prototype.every 원리
// 배열 안의 모든 요소가 주어진 조건을 통과하는지 테스트
function everyFunction(arr, func) {
  for (let el of arr) {
    const result = func(el);
    if (!result) return false;
  }
  return true;
}
const everyA = [1, 2, 3, 4];
everyFunction(everyA, (el) => typeof el === "number"); // 모두 true를 반환함
const everyB = [1, 2, 3, 4, "가", "나", "다"];
everyFunction(everyB, (el) => typeof el === "number"); // 스트링으로 인해 false를 반환함 if문에 걸림

// Array.prototype.find 원리
// 주어진 조건을 만족하는 첫번째 요소(가장 먼저 처음 통과한)의 값을 반환
function findFunction(arr, func) {
  for (let el of arr) {
    const result = func(el);
    if (result) return el;
  }
}
const findA = [1, 2, 3, 4];
findFunction(findA, (el) => el > 10); // 조건에 만족하는게 없으므로 undefined를 반환;
findFunction(findA, (el) => el > 3); // 4 반환
findFunction(findA, (el) => el > 0); // 1,2,3,4 모두 다 해당되지만 그 중 가장 첫번째인 1을 반환

// Array.prototype.findIndex 원리
// 제공된 조건 기능을 충족하는 배열의 첫번째 요소 인덱스를 반환
function findIndexFunction(arr, func) {
  for (let [index, el] of arr.entries()) {
    // entries() 메서드는 arr의 각 index에 대한 key, value를 반환할 수 있는 Iterator 객체를 반환한다
    const result = func(el);
    // console.log([index, el]); // [0, 1], [1, 2], [2, 3] ...
    if (result) return index;
  }
  return -1;
}

const findIndexA = [1, 2, 3, 4];
findIndexFunction(findIndexA, (el) => el > 10); // 해당되지 않으므로 -1을 반환
// findIndexFunction(findIndexA, (el) => el > 3); // 3보다 큰건 4이고 4의 index는 3 반환
// findIndexFunction(findIndexA, (el) => el > 0); // 모두 다 해당되지만 가장 첫번째는 1이므로 1의 인덱스는 0 반환

// Array.prototype.fiter 원리
// 조건을 통과하는 모든 요소를 모아 새로운 배열로 반환
function filterFunction(arr, func) {
  const newArr = [];

  for (let el of arr) {
    const result = func(el); // 불리언 값으로 result에 담김=
    if (result) newArr.push(el); // result에서 true인 el 요소가 newArr에 담김
  }
  return newArr;
}

const filterA = [1, 2, 3, 4, 5, 6, 7, 8];
filterFunction(filterA, (el) => el % 2 === 1); // 나머지가 1인 배열 요소를 newArr에 push하여 [1, 3, 5, ,7] 배열을 반환

// Array.prototype.map 원리
// 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
function mapFunction(arr, func) {
  const newArr = new Array(arr.length); // arr의 길이에 맞게 newArr의 길이가 고정됨

  for (let [index, el] of arr.entries()) {
    const result = func(el, index); // 요소와 인덱스 값을 함수에 전달
    // console.log(el); // 2, undefined, 4, undefined
    if (result) newArr[index] = result;
  }
  return newArr;
  // mapA의 length 4이기 때문에 무조건 lenght에 맞게 값을 넣어야함.
  // 근데 넘어온 최종 요소는 2개뿐.
  // 넘어온 요소의 기존 index 위치는 0, 2였으니 [2, empty, 4, empty]이 최종 값으로 반환 (undefined는 empty로 채워짐)
}

const mapA = [1, 2, 3, 4];
mapFunction(mapA, (el, index) => {
  // console.log(index); // 0, 1, 2, 3
  if (el % 2 === 1) {
    // 조건에 통과하는 값은 1, 3
    return el + 1; // 2, 4가 최종 반환
  }
});

// Array.protorype.reduce 원리
// 배열의 각 요소에 대해 주어진 reduce 함수를 실행하고 하나의 결과값을 반환
function reduceFunction(arr, func, first) {
  let total = first ? first : arr[0]; // first가 무슨...  callback 함수인가봄

  for (let [index, el] of arr.entries()) {
    // console.log(total); // 1, 3, 6, 10. arr를 요소를 더해서 반환값을 다음 요소와 더하고 나온 값들인듯 (1, 1+2=3, 3+3=6, 6+4=10)
    if (index !== arr.length - 1) {
      // arr.length - 1 은 3이다
      // index가 3이 아니면
      // 이 조건에 해당하는 index는 0, 1, 2이다. total의 lenght를 3으로 맞춘건가..?
      // console.log(total); // 1, 3, 6
      total = func(total, arr[index + 1]); // arr[index + 1]는 2, 3, 4이다. total+(arr[index + 1])인건가? 1+2=3, 3+3=6, 6+4=10
      // console.log(total); // 3, 6, 10
    }
  }
  // console.log(total); // 10
  return total;
}

const reduceA = [1, 2, 3, 4];
reduceFunction(reduceA, (acc, crr) => acc + crr); // 10 반환. acc가 total이고 crr이 arr[index+1]임

// functiondp return 값이 없으면 undefined를 반환. 이때 total + total이 아닌 total = undefined가 되어비린다
reduceFunction(reduceA, (acc, crr) => {
  if (crr % 2 === 0) {
    return acc + crr; // 3은 나머지가 1이기에 undefined이다 그러면서 undefined에 숫자를 더하려고 하니 NaN이 반환됨
  }
});

reduceFunction(reduceA, (acc, crr) => {
  if (crr % 2 === 1) {
    return acc + crr; // undefined이다. 요소 3에만 해당이 되어서
  }
});
