import logo from '../logo.svg';
import { BooksContextProvider } from '../contexts/BooksContext';
import Navbar from './Navbar';
import Bookshelf from './Bookshelf';

export default function Home() {
  return (
    <BooksContextProvider>

      <Navbar logo={logo} />

      <Bookshelf />

    </BooksContextProvider>
  )
}