import { User } from "@/types/users";
import UserImage from "./image";

interface UsersProps {
  users?: User[];
}

export default function Users({ users }: UsersProps) {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <ul className="grid grid-cols-4 gap-10 mb-10">
      {users.map((user) => (
        <li key={user.id} className="p-4 bg-gray-700/50 rounded-xl">
          <UserImage alt={user.name} />
          <div className="pt-5">
            <p className="text-md font-semibold">{user.name}</p>
            <p className="text-sm opacity-75">{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
