export const BUTTON_SIZE = {
  MD: "md",
  LG: "lg",
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    type = "button",
    disabled,
    size = BUTTON_SIZE.MD,
  } = props;

  const sizeStyles = size === BUTTON_SIZE.MD ? "px-4 py-2.5" : "px-8 py-6";

  return (
    <button
      type={type}
      className={`w-full rounded-sm text-white font-semibold transition-all duration-500 ease-in-out bg-gradient-to-r from-[var(--tymex-primary-1)] to-[var(--tymex-primary-2)] ${
        disabled ? "opacity-50" : "cursor-pointer hover:opacity-80"
      } ${sizeStyles}`}
      onClick={() => onClick?.()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
