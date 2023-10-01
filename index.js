const encode = input => [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap(x => x)
    .join('.')
    .match(/./g)
    .flatMap((x, i) => new Array(x == '.' ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join('')
    .replace(/(([01])\2*)/g, x => `${(+x ? '.' : '-')}${x.length}`)

let encodeValue=encode('привет дорогой мой как дела)');

console.log(encodeValue);

let decodeValue = encodeValue
.split(/(?=[.-])/)
.flatMap((subArray) => {
  let vl=(subArray.replace(/\d+/g, '') === '.') ? 1 : 0;
  let ln=parseInt(subArray.match(/\d+/g));
  let arr=new Array(ln).fill(vl);
  return arr;
})
;

let elements = decodeValue;

const result = decodeValue
  .flatMap((element, index, arr) => {
      if (index === 0 || element !== arr[index - 1]) {
        const param = (element === 1) ? 0 : 1;
        const endIndex = elements.indexOf(param); 

        returnArray = elements.slice(0, endIndex);
        elements = elements.slice(endIndex,elements.length);
        
        return [returnArray];
      }
      return [];
  })
  .flatMap((subArray) => {
    if (subArray.length === 1) {
      return '.';
    }
    const number = subArray.length.toString();
    return [(number-2)/2];
  })
  .join('')
  .split('.')
  .flatMap((number, index, arr) => {
      if (index % 2 === 0 && index + 1 < arr.length) {
      const nextIndex = index + 1;
      return [[number, arr[nextIndex]]];
      }
      return [];
  })
  .sort((a, b) => a[1] - b[1])
  .map((x,i)=>String.fromCharCode(x[0]))
  .join('')
;

console.log(result);
