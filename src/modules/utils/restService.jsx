import axios from "axios"

const post = async (url, body) => {

    return await axios.post(`http://localhost:8000${url}`, body, {withCredentials: true});
}
const get = async (url) => {

    return await axios.get(`http://localhost:8000${url}`, { withCredentials: true});
}

export default {
    post,
    get
}