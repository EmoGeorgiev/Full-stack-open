import { render, screen } from "@testing-library/react";
import { describe, vi, expect, beforeEach } from "vitest";
import BlogForm from './BlogForm'
import userEvent from "@testing-library/user-event";

describe('BlogForm tests', () => {
    let container;
    const createBlog = vi.fn()

    beforeEach(() => {
        container = render(<BlogForm createBlog={createBlog} />).container
    })

    test('calls the received event handler with the right details', async () => {
        const user = userEvent.setup()
        const createButton = screen.getByText('create')
        const titleInput = screen.getByPlaceholderText('write title here')
        const authorInput = screen.getByPlaceholderText('write author here')
        const urlInput = screen.getByPlaceholderText('write url here')
        
        await user.type(titleInput, 'test')
        await user.type(authorInput, 'testAuthor')
        await user.type(urlInput, 'https://example.com/test')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('test')
        expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
        expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/test')
    })
})