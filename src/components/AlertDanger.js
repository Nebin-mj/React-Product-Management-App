import React from "react";

const AlertDanger = ({ err }) => {
   return (
      <div className="alert alert-danger" role="alert">
         {err}
      </div>
   );
};

export default AlertDanger;
