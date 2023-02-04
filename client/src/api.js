import axios from "axios";

// Single async func for all requests
const request = (options) =>
  axios
    .request({
      ...options,
      headers: { ...options.headers, "Content-Type": "application/json" },
    })
    .then((response) => response.data)
    .catch((error) => error.response);

// API Methods
const API = {
  login: (username, password) =>
    request({
      method: "POST",
      url: "/api/novella/signin",
      data: {
        username,
        password,
      },
    }),
  logout: (token) =>
    request({
      method: "DELETE",
      url: "/api/novella/signout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  refreshToken: () =>
    request({
      method: "GET",
      url: "/api/novella/refresh",
    }),
  getBookshelf: (token) =>
    request({
      method: "GET",
      url: "/api/novella/bookshelf",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  addBook: (bookID, shelfKey, token) =>
    request({
      method: "PUT",
      url: `/api/novella/bookshelf/${bookID}/${shelfKey}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  removeBook: (bookID, token) =>
    request({
      method: "DELETE",
      url: `/api/novella/bookshelf/${bookID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  moveBook: (bookID, shelfKey, token) =>
    request({
      method: "PUT",
      url: `/api/novella/bookshelf/${bookID}/${shelfKey}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  viewBook: (bookID, token) =>
    request({
      method: "GET",
      url: `/api/novella/book/${bookID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  search: (bookTitle, token) =>
    request({
      method: "GET",
      url: `/api/novella/book/search/${bookTitle}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default API;
