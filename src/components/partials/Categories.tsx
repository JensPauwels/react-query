import { useCategories } from '../../hooks';
import CategoryItem from './CategoryItem';

import styles from '../../assets/styles/categories.module.scss';

const CategoryOverview = () => {
  const { isLoading, categories } = useCategories();

  if (isLoading) {
    return (
      <div>
        Is loading
      </div>
    );
  }

  return (
    <ul className={styles.categories}>
      {
        categories.map(category => (
          <CategoryItem category={category} key={category.id} />
        ))
      }
    </ul>
  );
};

export default CategoryOverview;
