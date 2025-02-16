import { z } from "zod";

export const userSchema = z.object({
  user: z.string().min(1, "Name is required"),
  interest: z.array(z.string()).min(1, "At least one interest is required"),
  age: z.number().min(10, "Age must be at least 10"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email format"),
});