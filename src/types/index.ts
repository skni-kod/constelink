import type { ReactNode } from "react";

export type Icon = (props: { className?: string }) => ReactNode;

export type User = {
  email: string;
  id: string;
  image?: string;
  name?: string;
};
