import BlankModal from '../electrons/BlankModal';
import { ModalProps } from '../types/ModalProps';
import { LuPlusCircle } from 'react-icons/lu';

const CreateModal = ({
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
      icon={<LuPlusCircle className='text-emerald-600 text-2xl' />}
      iconBg='bg-emerald-50'
      {...props}
    />
  );
};

export default CreateModal;
