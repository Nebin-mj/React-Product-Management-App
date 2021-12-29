import React from "react";
import Product from "./Product";

const Products = React.memo(({ products }) => {
   console.log("Products Rerender");
   return (
      <div className="products">
         {products.map(item => {
            return <Product key={`${item.id}`} {...item} />;
         })}
      </div>
   );
});

export default Products;
