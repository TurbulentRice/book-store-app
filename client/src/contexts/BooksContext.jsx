import { createContext, useState } from "react";

  /**
   * User auth context
   */

export const BooksContext = createContext();

export function BooksContextProvider({ children }) {
  
  // bookShelf will store uncategorized books
  const [bookShelf, setBookShelf] = useState([]);
  // The rest will be distributed to user's shelves
  const [wantToRead, setWantToRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [alreadyRead, setAlreadyRead] = useState([]);

  const addWantToRead = book => setWantToRead([...wantToRead, book])
  const addCurrentlyReading = book => setCurrentlyReading([...currentlyReading, book])
  const addAlreadyRead = book => setAlreadyRead([...alreadyRead, book])

  const states = {bookShelf, setBookShelf, wantToRead, currentlyReading, alreadyRead, addWantToRead, addCurrentlyReading, addAlreadyRead}

  return (
    <BooksContext.Provider value={states}>
      {children}
    </BooksContext.Provider>
  );
}