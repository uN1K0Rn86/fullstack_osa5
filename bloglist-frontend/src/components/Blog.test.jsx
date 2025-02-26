import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog title and author are rendered', async () => {
    const blog = {
        title: 'Mental Health for Heralds',
        author: 'Kaladin Stormblessed',
        url: 'https://roshar.com/heralds',
        likes: 1,
        user: {
            id: '80085',
            name: 'Shallan Davar',
            username: 'Sh4ll4n'
        }
    }

    const mockLike = vi.fn()
    const mockDelete = vi.fn()
    const username = 'Sh4ll4n'

    render(<Blog
        blog={blog}
        like={mockLike}
        username={username}
        remove={mockDelete}
    />)

    const title = await screen.findAllByText('Mental Health for Heralds')
    const author = await screen.findAllByText('Kaladin Stormblessed')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
})