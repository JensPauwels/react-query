import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Category from './components/models/Category';
import { QUERIES } from './constants';
import { getCategories, getCategoryByID } from './queries/categoryQueries';
import { getToken } from './utils';

export const useCategories = () => {
  const { isLoading, isError, error, data } = useQuery<Category[]>({
    queryKey: [QUERIES.CATEGORIES],
    queryFn: getCategories,
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
    queryKey: [QUERIES.CATEGORIES, categoryID],
    queryFn: () => getCategoryByID(categoryID),
  });

  return {
    category: data,
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

