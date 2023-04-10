import { useMemo } from 'react';
import { TodoItem } from '../partials';

import styles from '../../assets/styles/todos.module.scss';
import { useCategoryByID } from '../../hooks';

type TodosProps = {
  filter: string;
  categoryID: string;
}

const Todos = ({ filter, categoryID }: TodosProps) => {
  const { isLoading, isError, error, category } = useCategoryByID(categoryID);

  const filteredTodos = useMemo(() => {
    if (category === undefined) {
      return [];
    }

    return category.todos.filter(todo => {
      return todo.content.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter, category]);

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
