const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes
      ? max
      : item
  }
  if(blogs.length === 0){
    return {}
  }
  const result = blogs.reduce(reducer, blogs[0])
  return { title: result.title, author: result.author, likes: result.likes }
}

const mostBlogs = (blogs) => {
  // creates an object with the number of blogs per author
  const result = lodash.countBy(blogs, 'author')
  // find the key with the highest value
  const author = lodash.maxBy(Object.keys(result), (o) => result[o])
  return { author: author, blogs: result[author] }
}

const mostLikes = (blogs) => {
  // creates an object grouping the blogs by author
  const result = lodash.groupBy(blogs, 'author')
  // for each author, sum the likes and find the author with the highest sum
  const author = lodash.maxBy(Object.keys(result), (o) => lodash.sumBy(result[o], 'likes'))
  return { author: author, likes: lodash.sumBy(result[author], 'likes') }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}