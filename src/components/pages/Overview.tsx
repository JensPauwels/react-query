import { useState } from 'react';
import { useTodos } from '../../hooks';
import { AddTodo, Todos, SearchBar } from '../partials/';

const Overview = () => {
  const [ filter, setFilter ] = useState('');
  const { todos } = useTodos();

  const checkedTodos = todos?.filter(t => t.checked) || [];

  return (
    <main>
      <h1>
        My todos - {`${checkedTodos.length}/${todos?.length}`}
      </h1>

      <SearchBar filter={filter} setFilter={setFilter} />
      <Todos filter={filter} />
      <AddTodo />
    </main>
  );
};

export default Overview;
