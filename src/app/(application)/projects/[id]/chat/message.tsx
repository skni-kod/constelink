import { Avatar } from "@/components/avatar";

import type { User } from "@/types";

import { cx } from "@/utilities/classname";

type MessageProps = {
  user: User;
  right?: boolean;
  message: string;
  date: string;
};

export const Message = ({ user, right, message, date }: MessageProps) => {
  return (
    <div
      className={cx(
        "flex items-start gap-4 xl:w-9/12",
        right ? "ml-auto" : "flex-row-reverse",
      )}
    >
      <div
        className={cx(
          "rounded-xl p-4",
          right
            ? "rounded-tr-none bg-accent"
            : "rounded-tl-none bg-primary text-primary-foreground",
        )}
      >
        {message}
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <Avatar className="h-10 w-10" user={user} />
        <div className="text-muted-foreground">{date}</div>
      </div>
    </div>
  );
};
