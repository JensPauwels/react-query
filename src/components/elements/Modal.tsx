import { useEffect } from 'react';
import useModalStore, { MODAL_TYPE, useModal } from '../../stores/modalStore';

type ModalProps = {
  children: JSX.Element[] | JSX.Element;
  id: MODAL_TYPE
}

const Modal = ({ children, id }: ModalProps) => {
  const { register } = useModalStore();
  const { isOpen } = useModal(id);

  useEffect(() => {
    register(id);
  }, [id]);

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      { children }
    </div>
  );
};

export default Modal;
