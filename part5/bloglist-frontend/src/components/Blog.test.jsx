import { render, screen } from '@testing-library/react'
import { beforeEach, describe, vi, expect } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog tests', () => {
    const blog = {
        title: 'test',
        author: 'testAuthor',
        likes: 5,
        url: 'https://example.com/test',
        user: {username: 'test', user: 'test', password: ' '}
    }
    let container;
    const updateBlog = vi.fn()
    const removeBlog = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} username='test' updateBlog={updateBlog} removeBlog={removeBlog} />).container
    })


    test('renders only title and author', () => {
        expect(container).toHaveTextContent('test testAuthor')
    })

    test('renders url and likes', async () => { 
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        expect(container).toHaveTextContent('https://example.com/test')
        expect(container).toHaveTextContent('likes 5')
    })

    test('received event handler for like button is called twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
        expect(updateBlog.mock.calls).toHaveLength(2)
    })
})


