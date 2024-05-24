import Layout from '@/hoc/layouts/Layout';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { RouterContext } from '@/router';
import Tasks from '@/components/tasks/Tasks';

export const Route = createFileRoute('/tasks')({
  component: () => {
    return (
      <Layout>
        <Tasks />
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
