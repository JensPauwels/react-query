import { useMemo } from 'react';
import { TodoItem } from '../partials';
import { useCategoryByID } from '../../hooks';
import type Todo from '../models/Todo';

import styles from '../../assets/styles/todos.module.scss';

type TodosProps = {
  filter: string;
  categoryID: string;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
}

const Todos = ({ filter, categoryID, setSelectedTodo }: TodosProps) => {
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
          <TodoItem 
            todo={todo} 
            key={todo.id} 
            setSelectedTodo={setSelectedTodo}
          />
        ))
      }
    </ul>
  );
};

export default Todos;
