import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
export interface RouterContext {
  accessToken: string | null;
}

export const router = createRouter({
  routeTree,
  context: {
    accessToken: null!,
  },
});
