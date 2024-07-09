// import axios from 'axios';
// const customFetch = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default customFetch;

import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-backend.onrender.com/api'
    : 'http://localhost:8000/api';

const customFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customFetch;
