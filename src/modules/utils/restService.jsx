import axios from "axios"

const post = async (url, body, headers) => {

    return await axios.post(`http://localhost:8000${url}`, body, {withCredentials: true, headers: headers || {"Content-Type": "application/json"}});
}
const get = async (url, headers, responseType) => {

    return await axios.get(`http://localhost:8000${url}`, { withCredentials: true, headers, responseType: responseType});
}
const put = async (url, body) => {

    return await axios.put(`http://localhost:8000${url}`, body, { withCredentials: true});
}
const deleteHttp = async (url, body) => {

    return await axios.delete(`http://localhost:8000${url}`, { data: body, withCredentials: true});

}

export default {
    post,
    get, 
    put, 
    delete : deleteHttp
}