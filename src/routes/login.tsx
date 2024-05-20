import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/hoc/layouts/AuthLayout';
import { RouterContext } from '@/router';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (context.accessToken) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
