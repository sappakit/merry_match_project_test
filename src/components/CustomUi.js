export function CustomButton({
  children,
  onClick,
  type = "button",
  buttonType = "primary",
  customStyle = "h-full px-6 py-3",
}) {
  const buttonStyle = {
    primary: "bg-primary-500 text-utility-primary hover:bg-primary-600",
    secondary: "bg-primary-100 text-primary-600 hover:bg-primary-200",
  };

  let customClass = `btn min-h-0 rounded-full border-0 p-0 ${buttonStyle[buttonType] || ""} ${customStyle}`;

  return (
    <button type={type} className={customClass} onClick={onClick}>
      {children}
    </button>
  );
}
