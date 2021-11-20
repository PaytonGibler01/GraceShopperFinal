// import React, { useEffect } from "react";

// const SearchBar = ({ searchTerm, setSearchTerm, allProducts, setAllProducts }) => {
//   useEffect(() => {
//     const filtered = allProducts.filter((product) => {
//       if(product.title.includes(searchTerm)){
//       return true} else {
//         return false
//       }

//     });
//     setAllProducts(filtered);
//   }, [searchTerm]);

//   return (
//     <div className="searchBar">
//       <form>
//         <fieldset>
//           <label id="filter">Filter</label>
//           <input
//             id="filterInput"
//             type="text"
//             placeholder="filter"
//             value={searchTerm}
//             onChange={(event) => {
//               setSearchTerm(event.target.value);
//             }}
//           />
//         </fieldset>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
