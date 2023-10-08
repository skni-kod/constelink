import { useState } from "react";

import { Item, Root } from "@radix-ui/react-radio-group";

import { CircleInput } from "@/components/circle-input";

import { cx } from "@/utilities/classname";

type InputsGroupProps = {
  title: string;
};

export const InputsGroup = ({ title }: InputsGroupProps) => {
  const sizes = ["50px", "40px", "30px", "20px", "30px", "40px", "50px"];
  const [value, setValue] = useState("3");
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-center text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-12 text-xl">
        <div className="text-green-200">Agree</div>
        <Root
          onValueChange={setValue}
          value={value}
          className="flex items-center gap-4"
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
        <div className="text-red-200">Disagree</div>
      </div>
    </div>
  );
};
