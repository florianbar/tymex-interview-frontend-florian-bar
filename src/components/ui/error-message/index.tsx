import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface ErrorMessageProps {
  title: string;
  children: React.ReactNode | string;
}

export default function ErrorMessage({ title, children }: ErrorMessageProps) {
  return (
    <div className="text-center">
      <ExclamationTriangleIcon className="size-12 text-tymex-red-1 mx-auto mb-2" />
      <p className="text-2xl font-semibold mb-3">{title}</p>
      <div className="text-md">{children}</div>
    </div>
  );
}
