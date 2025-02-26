import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> calls onSubmit with correct information', async () => {
    const mockCreateBlog = vi.fn()

    render(<AddBlogForm createBlog={mockCreateBlog} />)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    const button = screen.getByText('Create')

    const user = userEvent.setup()
    await user.type(titleInput, 'Slaying Balrogs')
    await user.type(authorInput, 'Glorfindel')
    await user.type(urlInput, 'https://middleearth.blogspot.com')
    await user.click(button)

    const requestData = mockCreateBlog.mock.calls
    expect(requestData[0]).toContainEqual({
        title: 'Slaying Balrogs',
        author: 'Glorfindel',
        url: 'https://middleearth.blogspot.com'
    })
})