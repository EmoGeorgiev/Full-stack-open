import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'

describe('Blog tests', () => {
    const blog = {
        title: 'test',
        author: 'testAuthor',
        likes: 5,
        url: 'https://example.com/test',
        user: {username: 'test', user: 'test', password: ' '}
    }

    const updateBlog = vi.fn()
    const removeBlog = vi.fn()

    test('renders only title and author', () => {
        const { container } = render(<Blog blog={blog} username='test' updateBlog={updateBlog} removeBlog={removeBlog} />)
        expect(container).toHaveTextContent('test testAuthor')
    })

})


