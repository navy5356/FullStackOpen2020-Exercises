import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(baseURL)
            .then(response => response.data)
}

const create = newContact => {
    return axios
            .post(baseURL, newContact)
            .then(response => response.data)
}

const erase = id => {
    return axios
            .delete(`${baseURL}/${id}`)
            .then((response) => response.data)
}

const update = (contact) => {    
    return axios.put(`${baseURL}/${contact.id}`, contact)
                .then(response => response.data)
}

export default {getAll, create, erase, update}