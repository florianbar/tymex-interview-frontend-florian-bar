"use client";

import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchUsers, FetchUsersProps } from "@/utils/api";
import useDebounce from "@/hooks/useDebounce";
import { SEARCH_CATEGORY, DEFAULT_LIMIT } from "@/constants/users";
import Users from "@/components/users";
import Select from "@/components/ui/select";
import Search from "@/components/ui/search";
import Button, { BUTTON_SIZE } from "@/components/ui/button";
import Label from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import NoUsers from "@/components/no-users";
import ErrorMessage from "@/components/ui/error-message";
import { User } from "@/types/users";

export default function Home() {
  const [filterType, setFilterType] = useState(SEARCH_CATEGORY.NAME);
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery<User[]>({
    queryKey: ["users", filterType, debouncedFilterTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const props: FetchUsersProps = {
        page: pageParam as number,
        limit: DEFAULT_LIMIT,
      };

      if (filterType === SEARCH_CATEGORY.NAME) {
        props.name = debouncedFilterTerm;
      } else if (filterType === SEARCH_CATEGORY.EMAIL) {
        props.email = debouncedFilterTerm;
      }

      return fetchUsers(props);
    },
    getNextPageParam: (lastPage: User[], allPages: User[][]) => {
      return lastPage.length === DEFAULT_LIMIT
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    refetchInterval: 60000,
  });

  function handleFilterTypeChange(type: string) {
    setFilterType(type);
  }

  function handleFilterChange(value: string) {
    setFilterTerm(value);
  }

  const allUsers = useMemo(() => {
    if (!data) return [];
    return data?.pages.flat() ?? [];
  }, [data]);

  return (
    <div className="flex justify-between items-start">
      <div className="w-[380px] p-4">
        <h2 className="my-3 text-lg font-semibold uppercase">Filter</h2>

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

        {isPending && <Loader>Loading Users</Loader>}

        {isError && <ErrorMessage title="Error">{error.message}</ErrorMessage>}

        {debouncedFilterTerm && !isPending && allUsers.length === 0 && (
          <NoUsers filterTerm={debouncedFilterTerm} />
        )}

        <Users users={allUsers} />

        {hasNextPage && (
          <div className="w-[340px] pt-6 mx-auto">
            <Button
              onClick={() => fetchNextPage()}
              size={BUTTON_SIZE.LG}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load more"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
