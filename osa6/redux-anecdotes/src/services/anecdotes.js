const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
  console.log( `Posting ${content}`);
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
        { 
            'content': content,
            'id': getId(),
            'votes': 0
         }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  console.log('send');
  
  return await response.json()
}

const update = async (id, content) => {
  const url = `${baseUrl}/${id}`
  console.log( `put ${content}`);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  console.log('send');
  
  return await response.json()
}




export default { getAll, createNew, update }