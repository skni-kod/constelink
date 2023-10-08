import { Avatar } from "@/components/avatar";
import { Link } from "@/components/link";

export type MembersProps = {
  members: {
    id: string;
    image?: string;
    isLeader: boolean;
    name?: string;
    role: string;
  }[];
};

export const Members = ({ members }: MembersProps) => {
  const leader = members.find((member) => member.isLeader);
  const membersWithoutALeader = leader
    ? members.filter(({ id }) => id !== leader.id)
    : members;

  return (
    <ul className="group flex flex-col divide-y divide-border">
      {leader && (
        <li>
          <Link
            className="flex items-center gap-4 py-4 transition focus-within:!opacity-100 hover:!opacity-100 group-focus-within:opacity-50 group-hover:opacity-50"
            href={`/users/${leader.id}`}
          >
            <Avatar className="h-10 w-10" user={leader} />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{leader.name}</p>
              <p className="text-xs text-muted-foreground">
                Project leader, {leader.role}
              </p>
            </div>
          </Link>
        </li>
      )}
      {membersWithoutALeader.map((member) => (
        <li key={member.id}>
          <Link
            className="flex items-center gap-4 py-4 transition focus-within:!opacity-100 hover:!opacity-100 group-focus-within:opacity-50 group-hover:opacity-50"
            href={`/users/${member.id}`}
          >
            <Avatar className="h-10 w-10" user={member} />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
