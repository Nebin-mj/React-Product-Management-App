import React from "react";

const Center = ({ children }) => {
   return (
      <div className="text-primary d-flex justify-content-center align-items-center">
         {children}
      </div>
   );
};

export default Center;
