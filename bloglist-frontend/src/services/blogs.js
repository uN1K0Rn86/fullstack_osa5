import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    const blogs = response.data
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response
}

const update = async (id, newBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog)
    return response.data
}

const remove = async id => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}

export default { getAll, setToken, create, update, remove }
