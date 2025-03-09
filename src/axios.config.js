import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {'Authorization' : "Bearer " + sessionStorage.getItem('jwt')},
});

export default Axios;
