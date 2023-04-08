import { v4 as uuidv4 } from 'uuid';
import Todo from '../components/models/Todo';

// TodoStore represents a fake todo store.
class TodoStore {
  todos: Todo[];

  constructor() {
    this.todos = [
      new Todo({ id: uuidv4(), content: 'First note', checked: false }),
      new Todo({ id: uuidv4(), content: 'Second note', checked: true }),
      new Todo({ id: uuidv4(), content: 'Third note', checked: true }),
      new Todo({ id: uuidv4(), content: 'Fourth note', checked: true }),
      new Todo({ id: uuidv4(), content: 'Fifth note', checked: true }),
    ];
  }

  addTodo = (todo: Todo) => {
    this.todos.push(todo);
  };

  updateTodo = (todo: Todo) => {
    todo.checked = !todo.checked;

    // it is important to create a new object pointer, otherwise the custom hook won't re-render..
    this.todos = this.todos.map((t: Todo) => {
      if (t.id !== todo.id) {
        return t;
      }

      return new Todo(todo.toJSON());
    });
  };
}

export default new TodoStore();
