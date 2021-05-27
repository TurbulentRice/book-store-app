import axios from 'axios';

// Single async func for all requests
const request = options => axios.request({
  ...options,
  headers: {...options.headers, 'Content-Type': 'application/json'}
}).then(response => response.data)
  .catch(error => console.log(error))

// API Methods
const API = {
  login: (username, password) => request({
    method: "POST",
    url: '/api/signin',
    data: {
      username,
      password
    }
  }),
  logout: () => request({
    method: 'DELETE',
    url: '/api/signout'
  }),
  refreshToken: () => request({
    method: 'GET',
    url: '/api/refresh',
  }),
  getBookshelf: (token) => request({
    method: 'GET',
    url: '/api/bookshelf',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  addBook: (bookID, shelfKey, token) => request({
    method: 'PUT',
    url: `/api/bookshelf/${bookID}/${shelfKey}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  removeBook: (bookID, token) => request({
    method: 'DELETE',
    url: `/api/bookshelf/${bookID}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  moveBook: (bookID, shelfKey, token) => request({
    method: 'PUT',
    url: `/api/bookshelf/${bookID}/${shelfKey}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  viewBook: (bookID, token) => request ({
    method: 'GET',
    url: `/api/book/${bookID}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  search: (bookTitle, token) => request({
    method: 'GET',
    url: `/api/book/search/${bookTitle}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
}

export default API;