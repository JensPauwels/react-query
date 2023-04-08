import styles from '../../assets/styles/searchbar.module.scss';

type SearchBarProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ filter, setFilter }: SearchBarProps) => {
  return (
    <input 
      className={styles.searchbar}
      type="text" 
      placeholder="Type to search..."
      value={filter}
      onChange={ev => setFilter(ev.target.value)}
    />
  );
};

export default SearchBar;
