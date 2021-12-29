import { useState, useEffect, createContext, useCallback } from "react";
import AlertDanger from "./components/AlertDanger.js";
import Center from "./components/Center.js";
import Loading from "./components/Loading.js";
import NavTab from "./components/NavTab.js";
import Products from "./components/Products.js";

export const productsContext = createContext();
export const updFindIdContext = createContext();
export const setUpdFindIdContext = createContext();
export const deleteProductContext = createContext();

function App() {
   const [updFindId, setUpdFindId] = useState("");
   const [err, setErr] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   console.log("app rerender");
   const [products, setProducts] = useState([]);
   useEffect(() => {
      (async () => {
         try {
            setErr(null);
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/products");
            const resData = await response.json();
            setProducts(resData);
         } catch {
            setErr("Can't load products, something went wrong!!");
         } finally {
            setIsLoading(false);
         }
      })();
   }, []);

   const deleteProduct = useCallback(async id => {
      try {
         const sure = window.confirm(
            `Are you sure you want to delete the item with id:${id}`
         );
         if (!sure) return;
         const response = await fetch(
            `http://localhost:5000/api/products/${id}`,
            {
               method: "DELETE",
            }
         );
         const msg = await response.json();
         if (response.status === 200) {
            setProducts(prevProducts => {
               return prevProducts.filter(pro => pro.id !== id);
            });
            window.alert(msg.message);
         } else if (response.status === 404) {
            window.alert(msg.msg);
         }
      } catch {
         window.alert("Failed to  delete item");
      }
   }, []);

   return (
      <div className="main">
         <deleteProductContext.Provider value={deleteProduct}>
            <setUpdFindIdContext.Provider value={setUpdFindId}>
               <updFindIdContext.Provider value={updFindId}>
                  <productsContext.Provider value={[products, setProducts]}>
                     <NavTab />
                  </productsContext.Provider>
               </updFindIdContext.Provider>
               <Center>
                  {isLoading && <Loading />}
                  {err && <AlertDanger err={err} />}
               </Center>
               <Products products={products} />
            </setUpdFindIdContext.Provider>
         </deleteProductContext.Provider>
      </div>
   );
}

export default App;
