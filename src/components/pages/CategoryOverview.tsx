import { Categories } from '../partials/';
import { useToast } from '../Toast';

const CategoryOverview = () => {
  const toast = useToast();


  const addtoast = () => {
    if (toast !== undefined) {
      toast.success({ description: 'hello' });
    }
  };

  return (
    <main>
      <h1>
        My categories
      </h1>

      <Categories />

      <button onClick={addtoast}>
        ADd toast
      </button>
    </main>
  );
};

export default CategoryOverview;
