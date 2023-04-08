import { useMemo } from 'react';
import { TodoItem } from '../partials';

import styles from '../../assets/styles/todos.module.scss';
import { useTodos } from '../../hooks';

type TodosProps = {
  filter: string;
}

const Todos = ({ filter }: TodosProps) => {
  const { isLoading, isError, error, todos } = useTodos();

  const filteredTodos = useMemo(() => {
    if (todos === undefined) {
      return [];
    }

    return todos.filter(todo => {
      return todo.content.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter, todos]);

  if (isLoading) {
    return (
      <div>
        Is loading
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        { JSON.stringify(error) }
      </div>
    );
  }

  return (
    <ul className={styles.todos}>
      {
        filteredTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))
      }
    </ul>
  );
};

export default Todos;
