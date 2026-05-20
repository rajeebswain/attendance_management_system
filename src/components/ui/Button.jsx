// // Reusable button component

// function Button({

//     children,
  
//     type = "button",
  
//     onClick,
  
//     variant = "primary",
  
//   }) {
  
//     // Variant styles
//     const variants = {
  
//       primary: "bg-blue-600 hover:bg-blue-700 text-white",
  
//       danger: "bg-red-600 hover:bg-red-700 text-white",
  
//       success: "bg-green-600 hover:bg-green-700 text-white",
//     };
  
//     return (
  
//       <button
//         type={type}
//         onClick={onClick}
//         className={`
//           px-4
//           py-2
//           rounded
//           transition
//           ${variants[variant]}
//         `}
//       >
  
//         {children}
  
//       </button>
//     );
//   }
  
//   export default Button;


// Reusable button component

function Button({

  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  className = ""

}) {

  const variants = {

    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

  };

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded
        transition
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >

      {children}

    </button>

  );
}

export default Button;