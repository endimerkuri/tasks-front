import Layout from '@/hoc/layouts/Layout';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { RouterContext } from '@/router';
import Settings from '@/components/settings/Settings';

export const Route = createFileRoute('/settings')({
  component: () => {
    return (
      <Layout>
        <Settings />
      </Layout>
    );
  },
  beforeLoad: ({ context }: { context: RouterContext }) => {
    if (!context.accessToken) {
      throw redirect({
        to: '/login',
      });
    }
  },
});
