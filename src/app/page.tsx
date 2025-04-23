"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchUsers, FetchUsersProps } from "@/utils/api";
import useDebounce from "@/hooks/useDebounce";
import { SEARCH_CATEGORY, DEFAULT_LIMIT } from "@/constants/users";
import Users from "@/components/users";
import Select from "@/components/ui/select";
import Search from "@/components/ui/search";
import Button, { BUTTON_SIZE } from "@/components/ui/button";
import Label from "@/components/ui/label";

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

  function handleFilterTypeChange(type: string) {
    setFilterType(type);
  }

  function handleFilterChange(value: string) {
    setFilterTerm(value);
  }

  function incrementLimitSize() {
    setLimitSize((prevSize) => prevSize + DEFAULT_LIMIT);
  }

  return (
    <div className="flex justify-between items-start">
      <div className="w-[380px] p-4">
        <div className="mt-4 mb-6">
          <Search onChange={handleFilterChange} />
        </div>

        <Label>Filter by</Label>
        <Select
          options={[
            { label: "Name", value: SEARCH_CATEGORY.NAME },
            { label: "Email", value: SEARCH_CATEGORY.EMAIL },
          ]}
          value={filterType}
          onChange={handleFilterTypeChange}
        />
      </div>

      <div className="flex-1 p-6 h-screen overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold uppercase">Results</h2>
        </div>

        {isPending && <p>Loading...</p>}

        {isError && <p>Error: {error.message}</p>}

        {(!data || data.length === 0) && debouncedFilterTerm && (
          <p>No users found matching &quot;{debouncedFilterTerm}&quot;</p>
        )}

        <Users users={data} />

        {!isPending && (
          <div className="w-[340px] pt-6 mx-auto">
            <Button onClick={incrementLimitSize} size={BUTTON_SIZE.LG}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
