import { NoSymbolIcon } from "@heroicons/react/24/solid";

interface NoUsersProps {
  filterTerm: string;
}

export default function NoUsers({ filterTerm }: NoUsersProps) {
  return (
    <div className="text-center">
      <NoSymbolIcon className="size-12 text-tymex-blue-1 mx-auto mb-2" />
      <p className="text-2xl font-semibold mb-3">No Results Found</p>
      <p className="text-md">
        Sorry, looks like we didn&apos;t find any users matching:
        <br />
        <strong>{filterTerm}</strong>
      </p>
    </div>
  );
}
