export async function request(method, id, body) {
   const returnVal = {
      resData: null,
      status: null,
      error: null,
   };
   let error;
   const url = "www.localhost:5000/api/products";
   try {
      body = JSON.stringify(body);
   } catch {
      return {
         ...returnVal,
         error: "Enter valid input",
      };
   }
   const reqUrl = `${url}${id ? "/" + id : ""}`;
   const headers = body
      ? {
           "Content-Type": "application/json",
        }
      : null;
   const reqConf = {
      method,
      headers: headers ? headers : null,
      body: body ? body : null,
   };

   try {
      const response = await fetch(reqUrl, reqConf);
   } catch {
      return {
         ...returnVal,
         error: "Something went wrong. Try again",
      };
   }

   let resData;
   if (response.status != 404) {
      resData = await response.json();
   }
   return {
      ...returnVal,
      resData,
      status: response.status,
   };
}
