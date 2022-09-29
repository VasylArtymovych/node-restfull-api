// const axios = require("axios");

// const productsContainer = document.getElementById("products");

// const productsRequest = axios.get("http://localhost:3030/api/products");

// productsRequest
//   .then(({ data }) => {
//     const productElements = data
//       .map(
//         (item) => `<div>
//     <h5>${item.name}</h5>
//     <img src="http://localhost:3030/${item.image}"/>
//   </div>`
//       )
//       .join();
//     productsContainer.insertAdjacentElement("beforeend", productElements);
//   })
//   .catch((error) => console.log(error.message));
