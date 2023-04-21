import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Edit, Trash } from 'lucide-react';

import Todo from '../models/Todo';
import { Checkbox } from '../elements/';
import { QUERIES } from '../../constants';
import { updateTodo } from '../../queries/todoQueries';
import Category from '../models/Category';

import styles from '../../assets/styles/todos.module.scss';
import useModalStore, { MODAL_TYPE } from '../../stores/modalStore';

type TodoProps = {
  todo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
};

const TodoItem = ({ todo, setSelectedTodo }: TodoProps) => {
  const { open } = useModalStore();
  const queryClient = useQueryClient();
  const mounted = useRef(false);

  const { control, watch, getValues } = useForm<Todo>({
    defaultValues: todo,
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const todo = getValues();
    updateTodo(todo);

    queryClient.setQueryData([QUERIES.CATEGORIES, todo.categoryID], (category: Category | undefined) => {
      if (category !== undefined) {
        category.todos.forEach(t => {
          if (t.id === todo.id) {
            t.checked = todo.checked;
          }
        });

        return new Category(category.toJSON());
      }

      return category;
    });

    return;

  }, [watch('checked')]);

  const openEditTodo = () => {
    setSelectedTodo(todo);
    open(MODAL_TYPE.EDIT_TODO);
  };

  const openDeleteTodo = () => {
    setSelectedTodo(todo);
    open(MODAL_TYPE.DELETE_TODO);
  };

  return (
    <li className={`${styles.todo} ${todo.checked ? styles.done : undefined}`}>
      <span>
        {todo.content}
      </span>

      <Checkbox control={control} name="checked" />
      <Edit onClick={openEditTodo} />
      <Trash onClick={openDeleteTodo}/>
    </li>
  );
};

export default TodoItem;
