import PageNotFound from '@/hoc/layouts/PageNotFound';
import { RouterContext } from '@/router';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => <PageNotFound />,
});
