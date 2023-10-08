import { z } from "zod";

import { ID_LENGTH } from "@/utilities/id";

export const emailSchema = z
  .string({
    invalid_type_error: "Email address is invalid.",
    required_error: "Email address is required.",
  })
  .min(1, "Email address is required.")
  .email("Email address is invalid.");

export const idSchema = z
  .string()
  .regex(new RegExp(`^[a-z][0-9a-z]{${ID_LENGTH - 1}}$`));

export const passwordSchema = z
  .string({
    invalid_type_error: "Password is invalid.",
    required_error: "Password is required.",
  })
  .min(1, "Password is required.");

export const usernameSchema = z
  .string({
    invalid_type_error: "Username is invalid.",
    required_error: "Username is required.",
  })
  .max(191, "Username is too long.")
  .min(1, "Username is required.");
