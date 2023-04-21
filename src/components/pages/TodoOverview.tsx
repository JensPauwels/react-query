import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { useCategoryByID } from '../../hooks';
import { AddTodo, Todos, SearchBar } from '../partials/';
import { EditTodo } from '../modals';
import Todo from '../models/Todo';

const Overview = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const [ filter, setFilter ] = useState('');
  const { category, isLoading } = useCategoryByID(categoryID ?? '');

  const [ selectedTodo, setSelectedTodo ] = useState<undefined | Todo>(undefined);
  const checkedTodos = category?.todos?.filter(t => t.checked) || [];

  const goBack = () => {
    navigate('/');
  };

  return (
    <main>
      <div className="titleContainer">
        <h1>
          Todos from { category?.name } - { !isLoading && `${checkedTodos.length}/${category?.todos?.length}` }
        </h1>

        <div className="goBack" onClick={goBack}>
          <ArrowLeft />
          <span>
            Go back
          </span>
        </div>
      </div>

      <SearchBar filter={filter} setFilter={setFilter} />
      <Todos 
        filter={filter} 
        categoryID={categoryID ?? ''} 
        setSelectedTodo={setSelectedTodo}
      />
      <EditTodo 
        todo={selectedTodo} 
        setSelectedTodo={setSelectedTodo}
      />
      <AddTodo />
    </main>
  );
};

export default Overview;
