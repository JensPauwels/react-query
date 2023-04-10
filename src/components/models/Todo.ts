import { v4 as uuidv4 } from 'uuid';

export type ITodo = {
  id: string;
  content: string;
  checked: boolean;
  category_id: string;
}

class Todo {
  id: string;
  content: string;
  checked: boolean;
  categoryID: string;

  constructor(data?: Partial<ITodo>) {
    this.id = data?.id ?? uuidv4();
    this.content = data?.content ?? '';
    this.checked = data?.checked ?? false;
    this.categoryID = data?.category_id ?? '';
  }

  toJSON = (): ITodo => {
    return {
      id: this.id,
      content: this.content,
      checked: this.checked,
      category_id: this.categoryID,
    };
  };
}

export default Todo;
