import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Category from './components/models/Category';
import type Todo from './components/models/Todo';
import categoryStore from './stores/categoryStore';
import todoStore from './stores/todoStore';
import { getToken } from './utils';

export const useCategories = () => {
  const { isLoading, isError, error, data } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryStore.getCategories,
  });

  return {
    categories: data ?? [],
    isLoading,
    isError,
    error,
  };
};

export const useCategoryByID = (categoryID: string) => {
  const { isLoading, isError, error, data } = useQuery<Category>({
    queryKey: ['categories', categoryID],
    queryFn: () => categoryStore.getCategoryByID(categoryID),
  });

  return {
    category: data,
    isLoading,
    isError,
    error,
  };
};

export const useTodos = () => {
  const { isLoading, isError, error, data } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: todoStore.getTodos,
  });

  return {
    todos: data ?? [],
    isLoading,
    isError,
    error,
  };
};

export const useToken = () => {
  const token = getToken();

  const validateAuthorization = () => {
    if (token !== undefined) {
      return token.authorized && token.expiring > Date.now() / 1000;
    }

    return false;
  };

  const [ isAuthorized, setIsAuthorized ] = useState(validateAuthorization());

  useEffect(() => {
    const interval = setInterval(validateAuthorization, 5000);
    setIsAuthorized(validateAuthorization());

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    isAuthorized,
    token,
  };
};
