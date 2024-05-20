import * as z from 'zod';

export const LoginFormSchema = z.object({
  username: z.string().nonempty({
    message: 'usernameCannotBeEmpty',
  }),
  password: z.string().nonempty({
    message: 'passwordCannotBeEmpty',
  }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
