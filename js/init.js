const CATEGORIES_URL = "http://localhost:3001/cats";  
const PUBLISH_PRODUCT_URL = "http://localhost:3001/sell";  
const PRODUCTS_URL = "http://localhost:3001/cats_products";  
const PRODUCT_INFO_URL = "http://localhost:3001/products";  
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3001/products_comments"; 
const CART_INFO_URL = "http://localhost:3001/user_cart"; 
const CART_BUY_URL = "http://localhost:3001/cart";  
const EXT_TYPE = ".json";

let showSpinner = function(){
    const spinner = document.getElementById("spinner-wrapper");
  if (spinner) {
    spinner.style.display = "block";
  } else {
    console.error("Spinner element not found!");
  }
  
}

let hideSpinner = function(){
  const spinner = document.getElementById("spinner-wrapper");
  if (spinner) {
    spinner.style.display = "none";
  } else {
    console.error("Spinner element not found!");
  }
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}