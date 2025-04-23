import { User } from "@/types/users";

interface UsersProps {
  users?: User[];
}

export default function Users({ users }: UsersProps) {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  );
}
