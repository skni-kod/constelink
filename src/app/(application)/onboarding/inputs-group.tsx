import { useState } from "react";

import { Item, Root } from "@radix-ui/react-radio-group";

import { typography } from "@/utilities/typography";

type InputsGroupProps = {
  title: string;
};

const sizes = [
  "2.75rem",
  "2.25rem",
  "1.75rem",
  "1.25rem",
  "1.75rem",
  "2.25rem",
  "2.75rem",
];

export const InputsGroup = ({ title }: InputsGroupProps) => {
  const [value, setValue] = useState("3");

  return (
    <div className="flex flex-col items-center gap-4">
      <h2
        className={typography({
          className: "max-w-prose text-center [text-wrap:balance]",
          variant: "heading-4",
        })}
      >
        {title}
      </h2>
      <div className="flex w-full flex-col items-center justify-center gap-8 text-sm sm:flex-row">
        <div className="hidden text-green-500 sm:flex">Agree</div>
        <Root
          className="flex w-full max-w-xs items-center justify-between gap-1"
          onValueChange={setValue}
          value={value}
        >
          {sizes.map((size, index) => (
            <Item
              className="border-background-primary rounded-full border-2 transition hover:cursor-pointer hover:bg-primary data-[state=checked]:bg-primary"
              key={index}
              style={{
                height: size,
                width: size,
              }}
              value={`${index}`}
            />
          ))}
        </Root>
        <div className="mx-auto flex w-full max-w-xs justify-between sm:mx-0 sm:w-auto sm:max-w-none">
          <div className="text-green-500 sm:hidden">Agree</div>
          <div className="text-red-500">Disagree</div>
        </div>
      </div>
    </div>
  );
};
