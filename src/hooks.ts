import { useQuery } from '@tanstack/react-query';
import type Todo from './components/models/Todo';
import todoStore from './stores/todoStore';

export const useTodos = () => {
  const { isLoading, isError, error, data } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => {
      return todoStore.todos;
    }
  });

  return {
    todos: data,
    isLoading,
    isError,
    error,
  };
};
