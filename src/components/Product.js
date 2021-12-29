import React, { useContext } from "react";
import { deleteProductContext, setUpdFindIdContext } from "../App";

const Product = React.memo(({ id, name, description, price, msg }) => {
   console.log(`Product Rerender Id:${id}`);

   const setUpdFindId = useContext(setUpdFindIdContext);
   const deleteProduct = useContext(deleteProductContext);

   function updateProduct(id) {
      document.querySelector("#pills-update-tab").click();
      setUpdFindId(id);
      document.querySelector(".container").scrollIntoView();
      setTimeout(() => document.querySelector(".upd-find-btn").click(), 50);
   }

   return (
      <div className="card" style={{ width: "18rem" }}>
         <ul className="list-group list-group-flush">
            {msg && <li className="list-group-item">{msg}</li>}
            {!msg && (
               <>
                  <li className="list-group-item">
                     <span>{id}</span>
                     <span>
                        <i
                           desc="Update Product"
                           className="fas fa-edit"
                           onClick={() => updateProduct(id)}
                        ></i>
                        <i
                           desc="Delete Product"
                           onClick={() => deleteProduct(id)}
                           className="fas fa-trash"
                        ></i>
                     </span>
                  </li>
                  <li className="list-group-item">{name}</li>
                  <li className="list-group-item">{description}</li>
                  <li className="list-group-item">&#8377;{price}</li>
               </>
            )}
         </ul>
      </div>
   );
});

export default Product;
