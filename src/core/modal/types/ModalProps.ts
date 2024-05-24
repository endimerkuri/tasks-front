import { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  id?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  icon?: JSX.Element;
  iconBg?: string;
  description?: string;
  otherButtons?: JSX.Element[];
  width?: string;
  zIndex?: string;
  top?: string;
  img?: string;
  background?: boolean;
  padding?: string;
  onSubmit?: () => void;
  buttonTitle?: string;
}
