import SignupForm from '@/components/auth/SignupForm';
import AuthLayout from '@/hoc/layouts/AuthLayout';
import { RouterContext } from '@/router';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: Signup,
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (context.accessToken) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function Signup() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
