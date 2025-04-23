"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchUsers, FetchUsersProps } from "@/utils/api";
import useDebounce from "@/hooks/useDebounce";
import { SEARCH_CATEGORY, DEFAULT_LIMIT } from "@/constants/users";
import Users from "@/components/users";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";

export default function Home() {
  const [filterType, setFilterType] = useState(SEARCH_CATEGORY.NAME);
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm);

  const [limitSize, setLimitSize] = useState(DEFAULT_LIMIT);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users", filterType, debouncedFilterTerm, limitSize],
    queryFn: () => {
      const props: FetchUsersProps = {};

      if (filterType === SEARCH_CATEGORY.NAME) {
        props["name"] = debouncedFilterTerm;
      } else if (filterType === SEARCH_CATEGORY.EMAIL) {
        props["email"] = debouncedFilterTerm;
      }

      return fetchUsers({ ...props, limit: limitSize });
    },
    refetchInterval: 60000,
  });

  function handleFilterTypeChange(value: string) {
    setFilterType(value);
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterTerm(event.target.value);
  }

  function incrementLimitSize() {
    setLimitSize((prevSize) => prevSize + 10);
  }

  return (
    <>
      <div className="mb-3">
        <label>Filter by:</label>
        <Select
          options={[
            { label: "Name", value: SEARCH_CATEGORY.NAME },
            { label: "Email", value: SEARCH_CATEGORY.EMAIL },
          ]}
          value={filterType}
          onChange={handleFilterTypeChange}
        />
      </div>

      <div className="mb-3">
        <label>Filter:</label>
        <input type="text" value={filterTerm} onChange={handleFilterChange} />
      </div>

      {isPending && <p>Loading...</p>}

      {isError && <p>Error: {error.message}</p>}

      {(!data || data.length === 0) && debouncedFilterTerm && (
        <p>No users found matching &quot;{debouncedFilterTerm}&quot;</p>
      )}

      <Users users={data} />

      <Button onClick={incrementLimitSize}>Load more ({limitSize})</Button>
    </>
  );
}
