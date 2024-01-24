//Import the necessary dependencies
const http = require('http')
const productsService = require("./productsService");
const getRequestData = require('./utils');
const { update } = require('lodash');
// Define a prot at which the server will run
const PORT= process.env.PORT || 5000






const server = http.createServer(async (req, res) => {
 /* res.writeHead(200,{
    "content-type":"text/plain"
  })
  res.end("Hello")*/

  // Get all products
  if (req.url=== "/api/products" && req.method==="GET"){
    //set the status code,and content-type
    const product= await productsService.getProducts();
    res.writeHead(200,{
      "content-type":"application/json"
    });
    res.end(JSON.stringify(product));
  }
 

  // Get a product with specified id

   else if (req.url.startsWith("/api/products/") && req.method==="GET"){
    const productid=parseInt(req.url.split("/").pop(),10);
    //const id=req.params.id;
    const productbyid= productsService.getProductsById(productid);
    res.writeHead(200,{
      "content-type":"application/json"
    })
    res.end(JSON.stringify(productbyid))
  }

  // Create a new product
  else if (req.url=== "/api/products" && req.method==="POST"){
    let req_body=await getRequestData(req)
   // products.push(JSON.parse(req_body))
   let newProduct=JSON.parse(req_body);
   let saveProduct=productsService.saveProduct(newProduct);
    res.writeHead(201,{
      "content-type":"application/json"
    })
    res.end(JSON.stringify(saveProduct))
  }

  // Update a specific product
  else if (req.url.startsWith("/api/products/")&& req.method==="POST"){
    let productId=parseInt(req.url.split("/").pop(),10);
    let updateData= await getRequestData(req);
    let updateproduct=productsService.updateProduct(productId,JSON.parse(updateData))
    res.writeHead(200,{
      "content-type":"application/json"
    });
    res.end(JSON.stringify(updateproduct));
  }
  

  // Delete a specific Product
  else if (req.url.startsWith("/api/products/") && req.method==="DELETE"){
    const id=parseInt(req.url.split("/").pop(),10);
    const deleteId=productsService.deleteProduct(id);
    if(deleteId){
      res.writeHead(200,{
        "content-type":"application/json"
  
      });
      
      res.end("DELETED THE SPECIFIED ELEMENT");

    }
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on('error',(error)=>{
  if(error.code='EADRINUSER'){
    console.log('Port is already in use')
  }
});