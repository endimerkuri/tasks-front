import BlankModal from '../electrons/BlankModal';
import { ModalProps } from '../types/ModalProps';
import { TfiPencil } from 'react-icons/tfi';

const EditModal = ({
  id,
  title,
  isOpen,
  children,
  onClose,
  description,
  ...props
}: ModalProps) => {
  return (
    <BlankModal
      id={id}
      children={children}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      description={description}
      icon={<TfiPencil className='text-blue-600 text-2xl' />}
      iconBg='bg-blue-50'
      {...props}
    />
  );
};

export default EditModal;
