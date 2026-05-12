// Reusable card wrapper

function Card({ children }) {

    return (
  
      <div
        className="
          bg-white
          rounded-lg
          shadow-sm
          p-6
        "
      >
  
        {children}
  
      </div>
    );
  }
  
  export default Card;