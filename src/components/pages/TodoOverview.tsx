import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategoryByID } from '../../hooks';
import { AddTodo, Todos, SearchBar } from '../partials/';

const Overview = () => {
  const { categoryID } = useParams();

  const [ filter, setFilter ] = useState('');
  const { category, isLoading } = useCategoryByID(categoryID ?? '');

  const checkedTodos = category?.todos?.filter(t => t.checked) || [];

  return (
    <main>
      <h1>
        Todos from { category?.name } - { !isLoading && `${checkedTodos.length}/${category?.todos?.length}` }
      </h1>

      <SearchBar filter={filter} setFilter={setFilter} />
      <Todos filter={filter} categoryID={categoryID ?? ''} />
      <AddTodo />
    </main>
  );
};

export default Overview;
