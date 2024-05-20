import { ReactNode } from 'react';

interface ChildProps {
  link?: string;
}

const useActiveMenuItem = (
  link?: string,
  exact = false,
  children?: ReactNode | ReactNode[],
): boolean => {
  const currentLocation = window.location.pathname;

  if (children && Array.isArray(children)) {
    return children.some((child) => {
      if (child && typeof child === 'object' && 'props' in child) {
        const childProps = child.props as ChildProps;
        return childProps.link && currentLocation.startsWith(childProps.link);
      }
      return false;
    });
  }

  if (typeof link === 'string') {
    return exact ? currentLocation === link : currentLocation.startsWith(link);
  }

  return false;
};

export default useActiveMenuItem;
