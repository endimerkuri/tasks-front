import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { router } from './router';
import { tokenSelector } from './redux/slices/auth';

function App() {
  const accessToken = useSelector(tokenSelector);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} context={{ accessToken }} />
    </>
  );
}

export default App;
