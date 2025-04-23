import { useState } from "react";

interface SelectProps {
  type?: "text" | "email" | "password";
  initialValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const { type = "text", initialValue = "", placeholder, onChange } = props;

  const [value, setValue] = useState<string>(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setValue(value);
    onChange(value);
  }

  return (
    <input
      type={type}
      className="border border-tymex-gray rounded-md p-2.5 w-full text-[15px] font-medium"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
