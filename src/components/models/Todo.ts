import { v4 as uuidv4 } from 'uuid';

export type ITodo = {
  id: string;
  content: string;
  checked: boolean;
}

class Todo {
  id: string;
  content: string;
  checked: boolean;

  constructor(data?: ITodo) {
    this.id = data?.id ?? uuidv4();
    this.content = data?.content ?? '';
    this.checked = data?.checked ?? false;
  }

  toJSON = (): ITodo => {
    return {
      id: this.id,
      content: this.content,
      checked: this.checked
    };
  };
}

export default Todo;
