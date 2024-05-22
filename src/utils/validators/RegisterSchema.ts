import * as z from 'zod';

export const RegisterFormSchema = z.object({
  username: z.string().nonempty({
    message: 'usernameCannotBeEmpty',
  }),
  password: z.string().nonempty({
    message: 'passwordCannotBeEmpty',
  }),
  firstName: z.string().nonempty({
    message: 'firstNameCannotBeEmpty',
  }),
  lastName: z.string().nonempty({
    message: 'lastNameCannotBeEmpty',
  }),
  email: z.string().nonempty({
    message: 'emailCannotBeEmpty',
  }),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
