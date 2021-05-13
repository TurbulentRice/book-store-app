import { UserContextProvider } from './contexts/UserContext'
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  );
}
