import { v4 as uuid } from 'uuid';
import Todo, { ITodo } from './Todo';

export type ICategory = {
  id: string;
  author_id: string;
  name: string;
  todos: ITodo[];
};

class Category {
  id: string;
  authorID: string;
  name: string;
  todos: Todo[];

  constructor(data?: Partial<ICategory>) {
    this.id = data?.id ?? uuid();
    this.authorID = data?.author_id ?? '';
    this.name = data?.name ?? '';
    this.todos = data?.todos?.map(todo => new Todo({
      ...todo,
      category_id: this.id,
    })) ?? [];
  }

  toJSON = (): ICategory => {
    return {
      id: this.id,
      author_id: this.authorID,
      name: this.name,
      todos: this.todos.map(todo => todo.toJSON()),
    };
  };
}

export default Category;

