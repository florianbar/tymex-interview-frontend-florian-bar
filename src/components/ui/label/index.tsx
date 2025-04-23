interface LabelProps {
  children: React.ReactNode;
}

export default function Label(props: LabelProps) {
  const { children, ...rest } = props;

  return (
    <label
      {...rest}
      className="block uppercase mb-2 text-sm font-semibold text-gray-300"
    >
      {children}
    </label>
  );
}
