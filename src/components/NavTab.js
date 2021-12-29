import React from "react";
import AddProduct from "./AddProduct";
import FindProduct from "./FindProduct";
import UpdateProduct from "./UpdateProduct";

const NavTab = React.memo(() => {
   console.log("nav tab rerender");
   return (
      <div className="container">
         <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link active"
                  id="pills-find-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-find"
                  type="button"
                  role="tab"
                  aria-controls="pills-find"
                  aria-selected="true"
               >
                  Find Product
               </button>
            </li>
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link"
                  id="pills-add-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-add"
                  type="button"
                  role="tab"
                  aria-controls="pills-add"
                  aria-selected="false"
               >
                  Add Product
               </button>
            </li>
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link"
                  id="pills-update-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-update"
                  type="button"
                  role="tab"
                  aria-controls="pills-update"
                  aria-selected="false"
               >
                  Update Product
               </button>
            </li>
         </ul>
         <div className="tab-content" id="pills-tabContent">
            <FindProduct />
            <AddProduct />
            <UpdateProduct />
         </div>
      </div>
   );
});

export default NavTab;
