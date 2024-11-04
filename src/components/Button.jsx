const Button = ({ text, isProcess }) => {
  return (
    <button
      type="submit"
      className={`btn btn-primary text-white ${
        isProcess ? "btn-disabled" : ""
      }`}
    >
      {isProcess && <span className="loading loading-spinner"></span>}
      {text}
    </button>
  );
};

export default Button;
