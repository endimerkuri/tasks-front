import DefaultButton from '@/core/buttons/electrons/DefaultButton';
import Layout from '@/hoc/layouts/Layout';
import { removeAuth, tokenSelector } from '@/redux/slices/auth';
import { RouterContext } from '@/router';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/' });
  const accessToken = useSelector(tokenSelector);

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: '/login' });
    }
  }, [accessToken]);

  const onClick = () => {
    dispatch(removeAuth({}));
  };
  return (
    <Layout>
      <div>
        <DefaultButton onClick={onClick} label="Logout" />
      </div>
    </Layout>
  );
}
