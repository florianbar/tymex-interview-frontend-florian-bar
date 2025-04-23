interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, onClick, type = "button", disabled } = props;

  return (
    <button
      type={type}
      className={`w-full px-4 py-3 rounded-xs text-white font-semibold transition-all duration-500 ease-in-out bg-gradient-to-r from-[var(--tymex-primary-1)] to-[var(--tymex-primary-2)] ${
        disabled ? "opacity-50" : "cursor-pointer hover:opacity-80"
      }`}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
