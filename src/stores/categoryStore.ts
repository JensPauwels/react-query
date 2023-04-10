import Category, { ICategory } from '../components/models/Category';
import { execGraphQL } from '../utils';

class CategoryStore {
  getCategories = async (): Promise<Category[]> => {
    const { data } = await execGraphQL({
      query: '{categories {id, name }}'
    });

    return data.data.categories.map((category: ICategory) => new Category(category));
  };

  getCategoryByID = async (categoryID: string): Promise<Category> => {
    const { data } = await execGraphQL({
      query: `
        {
          categoryByID(id: "${categoryID}") {
            id,
            name,
            todos {
              id,
              content,
              checked,
              category_id,
            }
          }
        }
      `
    });

    return new Category(data.data.categoryByID);
  };

  addCategory = async (category: Category) => {
    await execGraphQL({
      query: `mutation{
        addCategory(id: "${category.id}", name: ${category.name}) {
          id
        }
      }`
    });
  };

  updateCategory = async (category: Category) => {
    await execGraphQL({
      query: `mutation{
        updateCategory(id: "${category.id}", name: ${category.name}) {
          id
        }
      }`
    });
  };
}

export default new CategoryStore();
