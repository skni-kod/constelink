"use client";

import type { ReactNode } from "react";

import { CheckCircle, X, XCircle } from "lucide-react";
import { toast as sonner, type ExternalToast } from "sonner";

import { cva, cx, type VariantProps } from "@/utilities/classname";

type ToastOptions = Pick<
  ExternalToast,
  | "description"
  | "dismissible"
  | "duration"
  | "icon"
  | "onAutoClose"
  | "onDismiss"
  | "position"
>;

type ToastProps = {
  description: ReactNode;
  icon: ReactNode;
  id: number | string;
  message: ReactNode;
  severity?: VariantProps<typeof toastButton>["severity"];
};

const toastButton = cva({
  base: "flex h-full w-full items-center justify-center rounded-full border transition",
  defaultVariants: {
    severity: "default",
  },
  variants: {
    severity: {
      default: "bg-background hover:bg-accent focus-visible:bg-accent",
      error:
        "border-red-100 bg-red-50 hover:bg-red-100 focus-visible:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:hover:bg-red-900 dark:focus-visible:bg-red-900",
      success:
        "border-green-100 bg-green-50 hover:bg-green-100 focus-visible:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:hover:bg-green-900 dark:focus-visible:bg-green-900",
    },
  },
});

const toastContainer = cva({
  base: "group relative flex w-full gap-3 rounded-md border p-4 text-sm shadow-lg",
  defaultVariants: {
    severity: "default",
  },
  variants: {
    severity: {
      default: "bg-background",
      error:
        "border-red-100 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
      success:
        "border-green-100 bg-green-50 text-green-600 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    },
  },
});

const Toast = ({ description, icon, id, message, severity }: ToastProps) => (
  <>
    <div className="absolute left-0 top-0 h-5 w-5 -translate-x-1/3 -translate-y-1/3 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100">
      <button
        className={toastButton({ severity })}
        onClick={() => sonner.dismiss(id)}
      >
        <X aria-hidden className="h-3 w-3" />
        <span className="sr-only">Close</span>
      </button>
    </div>
    <div>
      <div className="flex items-center gap-3">
        {typeof icon !== "undefined" && <div aria-hidden>{icon}</div>}
        <div className="font-medium">{message}</div>
      </div>
      <p className={cx("mt-1", typeof icon !== "undefined" && "ml-7")}>
        {description}
      </p>
    </div>
  </>
);

export const toast = (
  message: ReactNode,
  { description, icon, ...data }: ToastOptions = {},
) =>
  sonner.custom(
    (id) => (
      <Toast description={description} icon={icon} id={id} message={message} />
    ),
    {
      ...data,
      className: toastContainer(),
    },
  );

toast.error = (
  message: ReactNode,
  { description, icon, ...data }: ToastOptions = {},
) =>
  sonner.custom(
    (id) => (
      <Toast
        description={description}
        icon={icon ?? <XCircle className="h-4 w-4" />}
        id={id}
        message={message}
        severity="error"
      />
    ),
    {
      ...data,
      className: toastContainer({ severity: "error" }),
    },
  );

toast.success = (
  message: ReactNode,
  { description, icon, ...data }: ToastOptions = {},
) =>
  sonner.custom(
    (id) => (
      <Toast
        description={description}
        icon={icon ?? <CheckCircle className="h-4 w-4" />}
        id={id}
        message={message}
        severity="success"
      />
    ),
    {
      ...data,
      className: toastContainer({ severity: "success" }),
    },
  );
