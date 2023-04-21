import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from 'zod';

import type Todo from '../models/Todo';
import useModalStore, { MODAL_TYPE } from '../../stores/modalStore';
import { Modal } from '../elements/';

import '../../assets/styles/modal.scss';
import { useEffect } from 'react';

type DeleteTodoProps = {
  todo: Todo | undefined;
}

const schema = z.object({
  content: z.string().min(1, { message: 'Required' }),
});

const DeleteTodo = ({ todo }: DeleteTodoProps ) => {
  const { close } = useModalStore();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<Todo>({ 
    resolver: zodResolver(schema),
    defaultValues: todo,
  });

  useEffect(() => {
    reset(todo);
  }, [todo]);

  const closeModal = () => {
    close(MODAL_TYPE.DELETE_TODO);
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      closeModal();
    }
  };

  const save = handleSubmit(() => {
    console.log('save');
  });

  const cancel = () => {
    console.log('cancel');
    closeModal();
  };


  return (
    <Modal id={MODAL_TYPE.DELETE_TODO}>
      <Dialog.Root defaultOpen={true} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              <span>
                Delete todo
              </span>

              <X onClick={closeModal}/>
            </Dialog.Title>

            <Dialog.Description className="DialogDescription">
              Attention! This action cannot be undone!
            </Dialog.Description>

            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <button className="Button red" onClick={save}>Delete todo</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="Button" onClick={cancel}>Cancel</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Modal>
  );
};

export default DeleteTodo;
