export function getNext(index, length, isUp) {
  const num = isUp ? -1 : 1;
  let next = index + num;
  if (next < 0) {
    next = length - 1;
  }
  if (next === length) {
    next = 0;
  }
  return next;
}
