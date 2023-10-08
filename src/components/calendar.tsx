"use client";

import type { ComponentPropsWithoutRef } from "react";
import { DayPicker } from "react-day-picker";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cx } from "@/utilities/classname";

import { button } from "./button";

export type CalendarProps = ComponentPropsWithoutRef<typeof DayPicker>;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => (
  <DayPicker
    className={cx("p-3", className)}
    classNames={{
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-foreground",
      day: button({
        className: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        variant: "ghost",
      }),
      day_disabled: "text-muted-foreground opacity-50",
      day_hidden: "invisible",
      day_outside: "text-muted-foreground opacity-50",
      day_range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "bg-accent text-accent-foreground",
      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
      head_row: "flex",
      month: "flex flex-col gap-4",
      months: "flex flex-col sm:flex-row gap-4 sm:gap-y-0",
      nav: "gap-1 flex items-center",
      nav_button: button({
        className: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        variant: "outline",
      }),
      nav_button_next: "absolute right-1",
      nav_button_previous: "absolute left-1",
      row: "flex w-full mt-2",
      table: "w-full border-collapse",
      ...classNames,
    }}
    components={{
      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
      IconRight: () => <ChevronRight className="h-4 w-4" />,
    }}
    showOutsideDays={showOutsideDays}
    {...props}
  />
);

Calendar.displayName = "Calendar";
