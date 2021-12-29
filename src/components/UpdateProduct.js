import { useState, useEffect, useContext, useRef } from "react";
import Product from "./Product.js";
import {
   productsContext,
   updFindIdContext,
   setUpdFindIdContext,
} from "../App.js";
import Alert from "./Alert.js";

function UpdateProduct() {
   const name = useRef();
   const description = useRef();
   const price = useRef();
   const updateBtn = useRef();

   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);
   const [isFindLoading, setIsFindLoading] = useState(false);
   const [isUpdateLoading, setIsUpdateLoading] = useState(false);

   const [products, setProducts] = useContext(productsContext);
   const findId = useContext(updFindIdContext);
   const setFindId = useContext(setUpdFindIdContext);
   useEffect(() => {
      setProduct(prevProduct => {
         if (prevProduct) {
            const updatedProduct = products.find(
               pro => pro.id === prevProduct.id
            );
            if (!updatedProduct) {
               setFindId("");
               [name, description, price, updateBtn].forEach(ele => {
                  if (ele !== updateBtn) {
                     ele.current.value = "";
                  }
                  ele.current.setAttribute("disabled", "");
               });
               return null;
            } else return updatedProduct;
         }
         return prevProduct;
      });
   }, [products, setFindId]);

   async function findProduct(e) {
      e.preventDefault();

      try {
         setIsFindLoading(true);
         setError(null);
         if (findId !== "") {
            const response = await fetch(
               `http://localhost:5000/api/products/${findId}`
            );
            if (response.status === 200) {
               const resData = await response.json();
               setProduct(resData);
               const resDataArray = Object.entries(resData);
               [name, description, price].forEach((elem, i) => {
                  elem.current.removeAttribute("disabled");
                  elem.current.value = resDataArray[i + 1][1];
               });
               updateBtn.current.removeAttribute("disabled");
               //setFindId("");
               /*setProduct(products.find(p => p.id === parseInt(findId)));*/
               setError(null);
            } else {
               setError("Product not found");
            }
         } else setProduct(null);
      } catch {
         setError("Some error occured finding the product");
      } finally {
         setIsFindLoading(false);
      }
   }

   async function updateProduct(e) {
      e.preventDefault();
      const reqJSON = {
         name: name.current.value ? name.current.value : null,
         description: description.current.value
            ? description.current.value
            : null,
         price: price.current.value ? price.current.value : null,
      };
      let reqBody = {};
      try {
         reqBody = JSON.stringify(reqJSON);
      } catch {
         console.log("Enter valid data!");
         setError("Enter valid input!!");
         return;
      }
      try {
         setIsUpdateLoading(true);
         setError(null);
         const response = await fetch(
            `http://localhost:5000/api/products/${product.id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: reqBody,
            }
         );
         if (response?.status === 200) {
            const resData = await response.json();
            setProduct(resData);
            setProducts(prevProducts => {
               const index = prevProducts.findIndex(
                  pro => pro.id === resData.id
               );
               prevProducts.fill(resData, index, index + 1);
               return [...prevProducts];
            });
            [name, description, price].forEach(ele => {
               ele.current.value = "";
               ele.current.setAttribute("disabled", "");
            });
            updateBtn.current.setAttribute("disabled", "");
            setFindId("");
         } else setError("Updating failed!!");
      } catch {
         console.log("something went wrong");
         setError("Updating failed!!");
      } finally {
         setIsUpdateLoading(false);
      }
   }

   return (
      <div
         className="tab-pane fade"
         id="pills-update"
         role="tabpanel"
         aria-labelledby="pills-update-tab"
      >
         {error && <Alert alertText={error} />}
         <form onSubmit={updateProduct} className="update-form">
            <div className="input-group mb-3">
               <input
                  type="text"
                  id="update-id"
                  className="form-control"
                  placeholder="Type in the ID and find the product"
                  aria-label="ID"
                  aria-describedby="button-addon2"
                  autoComplete="off"
                  value={findId}
                  onChange={e => setFindId(e.target.value)}
               />
               {isFindLoading === true ? (
                  <button className="btn btn-primary" type="button" disabled>
                     <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                     ></span>
                     Loading...
                  </button>
               ) : (
                  <button
                     className="btn btn-outline-primary upd-find-btn"
                     type="button"
                     id="button-addon2"
                     onClick={findProduct}
                  >
                     Find Product
                  </button>
               )}
            </div>
            <div className="mb-3">
               <label htmlFor="update-name" className="form-label">
                  Name
               </label>
               <input
                  disabled
                  type="text"
                  className="form-control"
                  id="update-name"
                  autoComplete="off"
                  placeholder="Name"
                  ref={name}
               />
            </div>
            <div className="mb-3">
               <label htmlFor="update-description" className="form-label">
                  Description
               </label>
               <textarea
                  disabled
                  className="form-control"
                  id="update-description"
                  rows="3"
                  placeholder="Description"
                  ref={description}
               ></textarea>
            </div>
            <div className="mb-3">
               <label htmlFor="update-price" className="form-label">
                  Price
               </label>
               <input
                  disabled
                  type="text"
                  className="form-control"
                  id="update-price"
                  placeholder="Price"
                  autoComplete="off"
                  ref={price}
               />
            </div>
            <button
               className="btn btn-primary update-btn"
               type="submit"
               disabled
               ref={updateBtn}
            >
               <span
                  className={`spinner-grow spinner-grow-sm ${
                     isUpdateLoading === false ? "hidden" : ""
                  }`}
                  role="status"
                  aria-hidden="true"
               ></span>
               <span>Update Product</span>
            </button>
         </form>
         {product && <Product {...product} />}
      </div>
   );
}

export default UpdateProduct;
