import Todo, { ITodo } from '../components/models/Todo';
import { doFetch } from '../utils';

class TodoStore {
  getTodos = async (): Promise<Todo[]> => {
    const { data } = await doFetch('/api/graphql', 'POST', {
      query: '{todos {id, authorID,content,checked}}'
    });

    return data.data.todos.map((todo: ITodo) => new Todo(todo));
  };

  addTodo = async (todo: Todo) => {
    await doFetch('/api/graphql', 'POST', {
      query: `mutation{
        addTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}", category_id: "${todo.categoryID}") {
          id
        }
      }`
    });
  };

  updateTodo = async (todo: Todo) => {
    todo.checked = !todo.checked;

    await doFetch('/api/graphql', 'POST', {
      query: `mutation{
        updateTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}") {
          id
        }
      }`
    });
  };
}

export default new TodoStore();
