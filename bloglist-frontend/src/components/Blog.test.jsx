import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('Blog url, likes, and username are rendered after show more -button is clicked', async () => {
    const blog = {
        title: 'Choosing the Right Clothes with the Right Sword',
        author: 'Adolin Kholin',
        url: 'https://roshar.com/ad0lin',
        likes: 1919191919,
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

    const user = userEvent.setup()
    const showButton = screen.getByText('Show More')
    await user.click(showButton)

    const url = await screen.findByText(/https:\/\/roshar\.com\/ad0lin/)
    const likes = await screen.findByText(/1919191919/)
    const showUser = await screen.findByText(/Sh4ll4n/)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(showUser).toBeDefined()
})

test('Liking a blog twice calls the event handler twice', async () => {
    const blog = {
        title: 'Truthlessness or the Lack Thereof',
        author: 'Szeth',
        url: 'https://roshar.com/truthful',
        likes: 2,
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

    const user = userEvent.setup()
    const showButton = screen.getByText('Show More')
    await user.click(showButton)

    const likeButton = screen.getByRole('button', { name: 'Like' })
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLike.mock.calls).toHaveLength(2)
})