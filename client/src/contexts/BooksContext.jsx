import { createContext, useState } from "react";

  /**
   * User auth context
   */

export const BooksContext = createContext();

export function BooksContextProvider({ children }) {
  
  // bookBucket will store uncategorized books
  const [bookBucket, setBookBucket] = useState([]);
  // The rest will be distributed to user's shelves
  const [wantToRead, setWantToRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [alreadyRead, setAlreadyRead] = useState([]);

  const addWantToRead = (book) => setWantToRead([...wantToRead, book])

  return (
    <BooksContext.Provider value={{}}>
      {children}
    </BooksContext.Provider>
  );
}