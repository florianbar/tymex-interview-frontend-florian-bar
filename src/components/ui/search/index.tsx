import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SelectProps {
  type?: "text" | "email" | "password";
  initialValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Search(props: SelectProps) {
  const {
    type = "text",
    initialValue = "",
    placeholder = "Search users...",
    onChange,
  } = props;

  const [value, setValue] = useState<string>(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setValue(value);
    onChange(value);
  }

  return (
    <div className="flex justify-between items-center gap-2 border border-gray-500 rounded-sm p-2.5 ">
      <MagnifyingGlassIcon className="size-6 text-gray-400" />
      <input
        type={type}
        className="flex-1 text-[15px] font-medium outline-none focus:ring-0 focus:border-gray-400"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
