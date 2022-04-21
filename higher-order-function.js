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
    // entries() 메서드는 배열의 값들을 돌면서 key와 value 값을 반환
    const result = func(el);
    if (result) return index;
  }
  return -1;
}

const findIndexA = [1, 2, 3, 4];
findIndexFunction(findIndexA, (el) => el > 10); // 해당되지 않으므로 -1을 반환
findIndexFunction(findIndexA, (el) => el > 3); // 3보다 큰건 4이고 4의 index는 3 반환
findIndexFunction(findIndexA, (el) => el > 0); // 모두 다 해당되지만 가장 첫번째는 1이므로 1의 인덱스는 0 반환
