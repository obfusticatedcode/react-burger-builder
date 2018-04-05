import axios from 'axios';

const instance = axios.create({
  baseURL: `https://react-my-burger-b1808.firebaseio.com/`
})

export default instance;