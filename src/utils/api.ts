import { User } from "@/types/users";
import { DEFAULT_LIMIT } from "@/constants/users";

export interface FetchUsersProps {
  id?: number;
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
}

export async function fetchUsers(props: FetchUsersProps): Promise<User[]> {
  const { id, name, email, page = 1, limit = DEFAULT_LIMIT } = props;

  let url = process.env.NEXT_PUBLIC_USERS_API_URL || "";

  if (id || name || email || page || limit) {
    const params = new URLSearchParams();

    if (id) params.append("id", id.toString());
    if (name) params.append("name", name);
    if (email) params.append("email", email);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    url += `?${params.toString()}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
}
