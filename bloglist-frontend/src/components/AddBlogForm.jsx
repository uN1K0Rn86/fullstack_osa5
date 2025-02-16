const AddBlogForm = (props) => {
    const formstyle = {
        display: 'grid',
        gridTemplateColumns: '100px 150px',
        gap: '5px'
    }

    return (
        <div>
            <h3>Add a New Blog</h3>
            <form onSubmit={props.handleAddBlog} style={formstyle}>
                <div>
                    <label htmlFor="title">Title: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={props.title}
                        id="title"
                        name="Title"
                        onChange={({ target }) => props.setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={props.author}
                        id="author"
                        name="Author"
                        onChange={({ target }) => props.setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url: </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={props.url}
                        id="url"
                        name="Url"
                        onChange={({ target }) => props.setUrl(target.value)}
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
