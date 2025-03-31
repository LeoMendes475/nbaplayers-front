import axios from 'axios';

// const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

const api = axios.create({
  baseURL: "http://localhost",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
		// 'X-CSRF-TOKEN': document?.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  }
});


export default api
