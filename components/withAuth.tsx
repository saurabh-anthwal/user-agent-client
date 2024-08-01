import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationContext, AuthenticationContextProps } from '@/context/AuthenticationContext';
import Navbar from './Navbar';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useContext<AuthenticationContextProps | undefined>(AuthenticationContext) ?? {};
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace('/login');
      }
    }, [user, router]);

    if (!user) {
      return null; // or a loading spinner
    }

    return (
        <>
            <Navbar />
            <WrappedComponent {...props} />
        </>
    );
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
