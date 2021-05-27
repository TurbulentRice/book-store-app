import { UserContextProvider } from '../contexts/UserContext'
import AppRouter from '../routes/AppRouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BooksContextProvider } from '../contexts/BooksContext';

const queryClient = new QueryClient()

export default function App() {
  return (
    // Wrapping router with contexts here so I don't have to do it later
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BooksContextProvider>

          <AppRouter />

        </BooksContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
