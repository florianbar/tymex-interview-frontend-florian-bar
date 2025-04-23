interface NoUsersProps {
  filterTerm: string;
}

export default function NoUsers({ filterTerm }: NoUsersProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold">No Results Found</p>
      <p className="text-xl">
        Sorry, looks like we didn&apos;t find any users matching &quot;
        {filterTerm}
        &quot;
      </p>
    </div>
  );
}
