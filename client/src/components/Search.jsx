import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import imgErrorIcon from '../images/img_unavailable.png';
import API from '../api.js';

export default function Search() {
  // User context for token and keeping track of search even when user navs away
  const { token,
    searchString, setSearchString,
    searchResults, setSearchResults } = useContext(UserContext)
  
  let history = useHistory()

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Only update state if component is mounted
    // This is to prevent "Warning: Can't perform a React state update on an unmounted component."
    let isMounted = true;

    errorMessage && setErrorMessage("")
    searchString && setIsLoading(true)
    searchString
      ? API.search(searchString.trimEnd().replace(/\s/g, '+'), token).then(results => {
        if (isMounted) {
          results.message && setErrorMessage(results.message)
          results.books && setSearchResults(results.books) 
          setIsLoading(false)
        }
      })
      : isMounted && setSearchResults([])

    // Cleanup function disables setting state when component unmounted
    return () => isMounted = false
    
    // Ignoring this error because it's annoying:
    // "React Hook useEffect has missing dependencies: 'errorMessage' and 'setSearchResults'.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, token])

  const handleOpenBook = (bookID) => {
    history.push(`book/${bookID}`)
  }

  return (
    <div className="container m-4">

      {/* Search bar */}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text border-0">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <input
          type="search"
          value={searchString}
          onChange={e => setSearchString(e.target.value.trimStart())}
          autoFocus={true}
          className="form-control"
          placeholder="Search"/>
      </div>

      {/* Search results */}

      {errorMessage && <div>{errorMessage}</div>}
      {isLoading && <div>Loading...</div>}

      {searchResults && searchResults.map((book, index) => {
        return (
          <div className="row my-4" key={book.id+index}>

            <div className="col-2">
              <img
              onClick={() => handleOpenBook(book.id)}
              src={book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || imgErrorIcon : imgErrorIcon}
              alt={book.title || "N/A"}
              className=""/>
            </div>

            <div className="col">
              {book.title ? <button className="btn btn-link text-left p-0 m-0" onClick={() => handleOpenBook(book.id)}><h5>{book.title}</h5></button> : <h5>{'N/A'}</h5>}
              <p>
                {'by '}
                {book.authors && book.authors.map((author, index) => index === book.authors.length - 1 
                    ? author
                    : `${author}, `)}
              </p>
              <p>
                {book.publishedDate && new Date(book.publishedDate).getFullYear()}
              </p>
            </div>

          </div>
        )
      })
      }


    </div>
  )
}