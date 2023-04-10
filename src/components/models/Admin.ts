class Admin {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  toJSON = () => {
    return {
      email: this.username,
      password: this.password
    };
  };
}

export default Admin;
