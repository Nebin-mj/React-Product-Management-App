function Alert({ alertText }) {
   return (
      <div
         className="d-flex w-100 alert alert-danger"
         role="alert"
         style={{
            fontSize: "0.9rem",
            padding: "0.5rem 0.5rem",
            justifyContent: "space-between",
            alignItems: "center",
         }}
      >
         {alertText}
      </div>
   );
}

export default Alert;
