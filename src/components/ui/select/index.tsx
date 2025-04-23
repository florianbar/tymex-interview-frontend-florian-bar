import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const { options, value = "", placeholder, onChange } = props;

  const [selectedOption, setSelectedOption] = useState<string | null>(value);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  }

  return (
    <select
      className="border border-gray-500 rounded-sm px-1.5 py-2.5 w-full text-[15px] font-medium outline-none focus:ring-0 focus:border-gray-400"
      onChange={handleChange}
      value={selectedOption || ""}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
