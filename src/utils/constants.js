export const productTypes = [
  "Laptops",
  "Computers",
  "Smartphones",
  "TVs",
  "Monitors",
  "Keyboards",
  "Mice",
  "Headphones",
  "Microphones",
];

export function filter(products) {
  let filteredProducts = new Map();
  let counter = 0;
  console.log(products);
  for (let i = 0; i <= productTypes.length; i++) {
    filteredProducts.set(productTypes[i], new Array());
    for (let j = counter; j <= products.length; j++)
      if (products[j].type == productTypes[i]) {
        console.log(filteredProducts.get(productTypes[i]));
        filteredProducts.get(productTypes[i]).push(products[j]);
        console.log(filteredProducts.get(productTypes[i]));
      } else {
        counter = j;
        break;
      }
  }
  return filteredProducts;
}
