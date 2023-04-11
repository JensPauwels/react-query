import Todo, { ITodo } from '../components/models/Todo';
import { execGraphQL } from '../utils';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await execGraphQL({
    query: '{todos {id, authorID,content,checked}}'
  });

  return data.data.todos.map((todo: ITodo) => new Todo(todo));
};

export const addTodo = async (todo: Todo) => {
  await execGraphQL({
    query: `mutation{
      addTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}", category_id: "${todo.categoryID}") {
        id
      }
    }`
  });
};

export const updateTodo = async (todo: Todo) => {
  await execGraphQL({
    query: `mutation{
      updateTodo(id: "${todo.id}", checked: ${todo.checked}, content: "${todo.content}") {
        id
      }
    }`
  });
};

