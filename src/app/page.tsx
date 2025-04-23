"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import * as api from "@/utils/api";
import type { FetchUsersProps } from "@/utils/api";
import useDebounce from "@/hooks/useDebounce";
import { SEARCH_CATEGORY, DEFAULT_LIMIT } from "@/constants/users";
import Users from "@/components/users";

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

      return api.fetchUsers({ ...props, limit: limitSize });
    },
    refetchInterval: 60000,
  });

  function handleFilterTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterType(event.target.value);
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
        <select value={filterType} onChange={handleFilterTypeChange}>
          {Object.values(SEARCH_CATEGORY).map(
            (value: string, index: number) => (
              <option key={index} value={value}>
                {value}
              </option>
            )
          )}
        </select>
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

      <button type="button" onClick={incrementLimitSize}>
        Load more ({limitSize})
      </button>
    </>
  );
}
