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

type TodoProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoProps) => {
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

  return (
    <li className={`${styles.todo} ${todo.checked ? styles.done : undefined}`}>
      <span>
        {todo.content}
      </span>

      <Checkbox control={control} name="checked" />
      <Edit />
      <Trash />
    </li>
  );
};

export default TodoItem;
