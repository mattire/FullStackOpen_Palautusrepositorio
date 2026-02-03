const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]

  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  }

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = {}

  blogs.forEach((b)=>{
    if(authorCounts[b.author]==null){
      authorCounts[b.author]=1;
    } else {
      authorCounts[b.author]++;
    }
  });
  let maxCountAuthor = ''
  let maxCount = 0
   
  for (const [key, value] of Object.entries(authorCounts)) { 
    if(value>maxCount){
      maxCount = value
      maxCountAuthor = key
    }
  }
  return {
    author: maxCountAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  blogs.forEach((b)=>{
    if(authorLikes[b.author]==null){
      authorLikes[b.author]=b.likes;
    } else {
        authorLikes[b.author]+=b.likes;
    }
  });

  let maxLikesAuthor = ''
  let maxLikes = 0

  for (const [key, value] of Object.entries(authorLikes)) { 
    if(value>maxLikes){
      maxLikes = value
      maxLikesAuthor = key
    }
  }  
  return {
    author: maxLikesAuthor,
    likes:  maxLikes
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}