import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from 'zod';

import type Todo from '../models/Todo';

import '../../assets/styles/modal.scss';
import { useEffect } from 'react';

type EditTodoProps = {
  todo: Todo | undefined;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
}

const schema = z.object({
  content: z.string().min(1, { message: 'Required' }),
});

const EditTodo = ({ todo, setSelectedTodo }: EditTodoProps ) => {
  console.log(todo);

  const { register, reset, handleSubmit, formState: { errors } } = useForm<Todo>({ 
    resolver: zodResolver(schema),
    defaultValues: todo,
  });

  useEffect(() => {
    reset(todo);
  }, [todo]);

  const close = () => {
    setSelectedTodo(undefined);
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      setSelectedTodo(undefined);
    }
  };

  const save = handleSubmit(() => {
    console.log('save')
  });

  const cancel = () => {
    console.log('cancel');
  };

  if (todo === undefined) {
    return null;
  }

  return (
    <div>
      <Dialog.Root defaultOpen={true} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              <span>
                Edit todo
              </span>

              <X onClick={close}/>
            </Dialog.Title>

            <Dialog.Description className="DialogDescription">
              Make changes to your todo here. Click save when you're done.
            </Dialog.Description>

            <form onSubmit={save}>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="todo">
                  todo
                </label>
                <input 
                  {...register('content')} 
                  id="todo" 
                  placeholder="Learn react-query..." 
                />
                {
                  errors.content && (
                    <span className="inputError">{errors.content.message }</span>
                  )
                }
              </fieldset>
              <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <button className="Button green" onClick={save}>Save changes</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="Button red" onClick={cancel}>Cancel</button>
              </div>
            </form>
            
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default EditTodo;
