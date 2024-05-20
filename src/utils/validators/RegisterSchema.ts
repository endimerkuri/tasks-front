import * as z from 'zod';

export const RegisterFormSchema = z.object({
  username: z.string().nonempty({
    message: 'usernameCannotBeEmpty',
  }),
  password: z.string().nonempty({
    message: 'passwordCannotBeEmpty',
  }),
  fullName: z.string().nonempty({
    message: 'fullNameCannotBeEmpty',
  }),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
