interface FetchUsersProps {
  id?: number;
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
}

export default function fetchUsers(props: FetchUsersProps): Promise<Response> {
  const { id, name, email, page, limit } = props;
  const url = process.env.NEXT_PUBLIC_USERS_API_URL || "";

  if (id || name || email || page || limit) {
    const params = new URLSearchParams();

    if (id) params.append("id", id.toString());
    if (name) params.append("name", name);
    if (email) params.append("email", email);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    return fetch(`${url}?${params.toString()}`);
  }

  return fetch(url);
}
