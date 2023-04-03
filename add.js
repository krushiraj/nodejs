export default function add(a, b) {
  return a + b;
}

const addOne = add.bind(null, 1);
const addTen = add.bind(null, 10);

export { addOne, addTen };
