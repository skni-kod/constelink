import { Filter } from "lucide-react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export const SearchBar = () => {
  return (
    <div className="mb-4 p-4">
      <div className="flex justify-center">
        <div className="flex w-full max-w-md items-center rounded-lg dark:bg-transparent">
          <Filter className="mr-2 h-6 w-6 text-gray-500" />
          <Input
            className="rounded-br-none rounded-tr-none focus-visible:ring-0"
            placeholder="Search..."
          />
          <Button className="rounded-bl-none rounded-tl-none">Search</Button>
        </div>
      </div>
    </div>
  );
};
