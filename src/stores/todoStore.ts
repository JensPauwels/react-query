import Todo, { ITodo } from '../components/models/Todo';
import { execGraphQL } from '../utils';

class TodoStore {
  getTodos = async (): Promise<Todo[]> => {
    const { data } = await execGraphQL({
      query: '{todos {id, authorID,content,checked}}'
    });

    return data.data.todos.map((todo: ITodo) => new Todo(todo));
  };

  addTodo = async (todo: Todo) => {
    await execGraphQL({
      query: `mutation{
        addTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}", category_id: "${todo.categoryID}") {
          id
        }
      }`
    });
  };

  updateTodo = async (todo: Todo) => {
    todo.checked = !todo.checked;

    await execGraphQL({
      query: `mutation{
        updateTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}") {
          id
        }
      }`
    });
  };
}

export default new TodoStore();
