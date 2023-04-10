import Admin from '../components/models/Admin';
import { doFetch } from '../utils';

const URLS = {
  LOGIN: 'api/auth/login'
};

class GlobalStore {
  admin: Admin;

  constructor() {
    this.admin = new Admin();
  }

  login = async () => {
    console.log(this.admin);
    const { status } = await doFetch(URLS.LOGIN, 'POST', this.admin);

    console.log(status, 'status');

    if (status !== 200) {
      throw new Error('FAILED_TO_LOGIN');
    }

    console.log(this.admin);
  };
}

export default new GlobalStore();
