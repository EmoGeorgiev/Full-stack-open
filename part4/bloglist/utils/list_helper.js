
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
    result = {
        title: current.title,
        author: current.author,
        likes: current.likes
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
}