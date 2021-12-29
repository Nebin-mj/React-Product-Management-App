import { useState, useEffect, useContext } from "react";
import Product from "./Product";
import { productsContext } from "../App";

function FindProduct() {
   const [findId, setFindId] = useState("");
   const [product, setProduct] = useState(null);
   const [err, setErr] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const [products] = useContext(productsContext);

   useEffect(() => {
      (async () => {
         try {
            setErr(null);
            setIsLoading(true);
            if (findId !== "") {
               const response = await fetch(
                  `http://localhost:5000/api/products/${findId}`
               );
               setProduct(await response.json());
               //setFindId("");
               /*setProduct(products.find(p => p.id === parseInt(findId)));*/
            } else setProduct(null);
         } catch {
            setErr("Something went wrong, can't load product");
         } finally {
            setIsLoading(false);
         }
      })();
   }, [findId, products]);
   async function findProduct(e) {
      e.preventDefault();
   }
   return (
      <div
         className="tab-pane fade show active"
         id="pills-find"
         role="tabpanel"
         aria-labelledby="pills-find-tab"
      >
         <form className="find-form" onSubmit={findProduct}>
            <div className="mb-3">
               <label htmlFor="find-id" className="form-label">
                  ID
               </label>
               <div className="inpt-container">
                  <input
                     type="text"
                     className="form-control"
                     id="find-id"
                     placeholder="ID"
                     autoComplete="off"
                     value={findId}
                     onChange={e => setFindId(e.target.value)}
                  />
                  {isLoading && (
                     <div
                        className="spinner-grow text-primary loading"
                        role="status"
                     >
                        <span className="sr-only">Loading...</span>
                     </div>
                  )}
               </div>
            </div>
            {/* <button className="btn btn-primary find-btn" type="submit">
               <span
                  className="spinner-grow spinner-grow-sm hidden"
                  role="status"
                  aria-hidden="true"
               ></span>
               <span>Find Product</span>
            </button> */}
         </form>
         {err && (
            <div className="alert alert-danger" role="alert">
               <strong>{err}</strong>
            </div>
         )}
         {product && <Product {...product} />}
      </div>
   );
}

export default FindProduct;
