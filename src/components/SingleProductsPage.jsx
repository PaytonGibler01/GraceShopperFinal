// import React from "react";
// import { useParams } from "react-router";
// import { SingleProducts } from ".";


// const SingleProductsPage = ({ allProducts }) => {
//   const { productId } = useParams();

//   const compProduct = allProducts.find((product) => product._id === productId)

//   if (!compProduct) {
//     return (
//       <div className="product-card">
//         <h3> The product with id {productId} was not found</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="products-main-container">
//       <SingleProducts product={compProduct} />
//     </div>
//   );
// };

// export default SingleProductsPage;
