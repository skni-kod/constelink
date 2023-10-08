import { Avatar } from "@/components/avatar";

import type { User } from "@/types";

export type MemberCardProps = {
  user: Omit<User, "email">;
  button?: boolean;
};

export const MemberCard = ({ user, button }: MemberCardProps) => {
  return (
    <li
      className="mt-2 flex items-center gap-4 rounded-full border-2 border-white p-4 shadow-md"
      key={user.id}
    >
      <Avatar className="h-8 w-8" user={user} />
      <div className="ml-4 flex flex-1 items-center justify-between">
        <div className="text-lg font-semibold">{user.name}</div>
        {button && (
          <a
            href="/"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Data
          </a>
        )}
      </div>
    </li>
  );
};
