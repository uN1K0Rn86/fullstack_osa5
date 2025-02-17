import { useState } from "react"

const AddBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const formstyle = {
        display: 'grid',
        gridTemplateColumns: '100px 150px',
        gap: '5px'
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Add a New Blog</h3>
            <form onSubmit={addBlog} style={formstyle}>
                <div>
                    <label htmlFor="title">Title: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={title}
                        id="title"
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={author}
                        id="author"
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={url}
                        id="url"
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlogForm
