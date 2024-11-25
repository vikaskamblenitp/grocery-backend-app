import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long")
  .refine(
    (password) => /[A-Z]/u.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[a-z]/u.test(password),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (password) => /[0-9]/u.test(password),
    "Password must contain at least one digit"
  )
  .refine(
    (password) => /[@$!%*?&]/u.test(password),
    "Password must contain at least one special character (@, $, !, %, *, ?, &)"
  );

export const schema = {
  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: passwordSchema,
    })
  }),

  createUser: z.object({
    body: z.object({
      email: z.string().email(),
      password: passwordSchema,
      first_name: z.string().max(20).min(1),
      last_name: z.string().max(20).min(1),
      profile_url: z.string().url().optional(),
    })
  })
}