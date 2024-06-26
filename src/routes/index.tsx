import Dashboard from '@/components/dashboard/Dashboard';
import Layout from '@/hoc/layouts/Layout';
import { RouterContext } from '@/router';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (!context.accessToken) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function Index() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
