import { Puff } from  'react-loader-spinner';

import styles from '../../assets/styles/loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Puff
        height="150"
        width="150"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
