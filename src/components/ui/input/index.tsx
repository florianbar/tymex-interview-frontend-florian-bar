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
      className="border border-gray-500 rounded-sm p-2.5 w-full text-[15px] font-medium outline-none focus:ring-0 focus:border-gray-400"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
