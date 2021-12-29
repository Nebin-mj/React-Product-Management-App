import { useState, useEffect, useContext } from "react";
import Alert from "./Alert";
import { productsContext } from "../App.js";
import Product from "./Product";

function AddProduct() {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [error, setError] = useState("");
   const [product, setProduct] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const [products, setProducts] = useContext(productsContext);

   useEffect(() => {
      setProduct(prevProduct => {
         if (prevProduct) {
            const foundProduct = products.find(
               pro => pro.id === prevProduct.id
            );
            if (foundProduct) return foundProduct;
            else return null;
         }
         return prevProduct;
      });
   }, [products]);

   async function addProduct(e) {
      e.preventDefault();
      if (!name || !description || !price) {
         setError("Enter all the fields");
         return;
      } else setError("");
      let reqBody;
      try {
         setError(null);
         reqBody = JSON.stringify({
            name,
            description,
            price,
         });
      } catch {
         setError("Enter valid input!");
         return;
      }
      try {
         setError(null);
         setIsLoading(true);
         const response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: reqBody,
         });
         if (response?.status === 201) {
            const resData = await response.json();

            setName("");
            setDescription("");
            setPrice("");

            setProduct(resData);
            setProducts(prevProduct => setProducts([...prevProduct, resData]));
         } else setError("Oops something went wrong, try again");
      } catch {
         setError("Adding products failed, try again");
         return;
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <div
         className="tab-pane fade"
         id="pills-add"
         role="tabpanel"
         aria-labelledby="pills-add-tab"
      >
         {error && <Alert alertText={error} />}
         <form onSubmit={addProduct} className="add-form">
            <div className="mb-3">
               <label htmlFor="add-name" className="form-label">
                  Name
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="add-name"
                  placeholder="Name"
                  autoComplete="off"
                  value={name}
                  onChange={e => setName(e.target.value)}
               />
            </div>
            <div className="mb-3">
               <label htmlFor="add-description" className="form-label">
                  Description
               </label>
               <textarea
                  className="form-control"
                  id="add-description"
                  rows="3"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
               ></textarea>
            </div>
            <div className="mb-3">
               <label htmlFor="add-price" className="form-label">
                  Price
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="add-price"
                  placeholder="Price"
                  autoComplete="off"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
               />
            </div>
            <button className="btn btn-primary add-btn" type="submit">
               <span
                  className={`spinner-grow spinner-grow-sm ${
                     !isLoading && "hidden"
                  }`}
                  role="status"
                  aria-hidden="true"
               ></span>
               <span>Add Product</span>
            </button>
         </form>
         {product && <Product {...product} />}
      </div>
   );
}

export default AddProduct;
