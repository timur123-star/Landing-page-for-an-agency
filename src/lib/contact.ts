import { z } from "zod";
export type ContactMessages = {
  name: string;
  emailRequired: string;
  emailFormat: string;
  messageMin: string;
};
const fallback: ContactMessages = {
  name: "Имя должно быть не короче 2 символов",
  emailRequired: "Введите e-mail",
  emailFormat: "Похоже на некорректный e-mail",
  messageMin: "Хотя бы пара предложений — нам важен контекст",
};
export const createContactSchema = (msgs: ContactMessages = fallback) =>
  z.object({
    name: z.string().min(2, { message: msgs.name }).max(80),
    email: z
      .string()
      .min(1, { message: msgs.emailRequired })
      .email({ message: msgs.emailFormat }),
    company: z.string().max(100).optional().or(z.literal("")),
    budget: z.string().max(50).optional().or(z.literal("")),
    message: z.string().min(20, { message: msgs.messageMin }).max(1000),
  });
export const contactSchema = createContactSchema();
export type ContactInput = z.infer<typeof contactSchema>;
