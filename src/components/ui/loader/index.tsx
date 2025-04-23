import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface LoaderProps {
  children?: React.ReactNode;
}

export default function Loader({ children }: LoaderProps) {
  return (
    <div className="flex gap-3 justify-center items-center my-2">
      <ArrowPathIcon className="size-10 text-tymex-primary-1 animate-spin" />
      <div className="text-xl font-semibold">{children}</div>
    </div>
  );
}
