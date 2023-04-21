import Category from '../models/Category';

import styles from '../../assets/styles/categories.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type CategoryProps = {
  category: Category
};

const CategoryItem = ({ category }: CategoryProps) => {
  const navigate = useNavigate();

  const goToCategory = () => {
    navigate(`/overview/${category.id}`);
  };

  return (
    <li className={styles.category} onClick={goToCategory}>
      {category.name}
      <ArrowRight />
    </li>
  );
};

export default CategoryItem;
