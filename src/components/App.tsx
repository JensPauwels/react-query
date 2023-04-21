import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


import { Toasts } from './Toast';
import Router from './Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Toasts>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Toasts>
  );
};

export default App;
