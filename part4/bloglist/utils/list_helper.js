
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.map(blog => blog.likes)
                .reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let current = blogs[0]

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > current.likes) {
            current = blogs[i]
        }
    }
    const result = {
        title: current.title,
        author: current.author,
        likes: current.likes
    }
    return result
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return { author: '', blogs: 0 }
    } 
    
    const authors = Array.from(new Set(blogs.map(blog => blog.author)))
    let currentMostAuthor = authors[0]
    let currentMostBlogs = 0

    for (let i = 0; i < authors.length; i++) {
        let currentAuthor = authors[i]
        let currentBlogs = 0
        for (let j = 0; j < blogs.length; j++) {
            if (currentAuthor === blogs[j].author) {
                currentBlogs++
            }
        }
        if (currentBlogs > currentMostBlogs) {
            currentMostAuthor = currentAuthor
            currentMostBlogs = currentBlogs
        }
    }
    return {
        author: currentMostAuthor,
        blogs: currentMostBlogs
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
} 