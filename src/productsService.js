// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = async () => {
  const clonedProductList=lodash.cloneDeep(productsList);
  return clonedProductList;
}

const getProductsById = (productId) => {
  const product = productsList.find((item)=>item.id === productId);
  //const product= productsList.findone({id:productId});

  // get a product by ID

  return product ? lodash.cloneDeep(product):null;
}

const saveProduct = (newProduct) => {
 // save a product
  productsList.push(newProduct);
  return lodash.cloneDeep(productsList);
}

const updateProduct = (productId, updateData) => {
  let productIndex=productsList.findIndex((item)=>item.id===productId)
  // update the product list
  if(productIndex!=-1){
    productsList[productIndex]={...productsList[productIndex],...updateData};
  }
  return lodash.cloneDeep(productsList);
}

const deleteProduct = (productId) => {
  // delete a product 
   productsList.filter((item)=>item.id!==productId);

     
  return(lodash.cloneDeep(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}