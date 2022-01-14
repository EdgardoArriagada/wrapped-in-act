import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface User {
  userId: number
  id: number
  title: string
  body: string
}

const filterUsers = (response: AxiosResponse<User[], any>) =>
  response.data.filter((post) => post.title === 'post gone')

const UsernameForm = () => {
  const [posts, setPosts] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/posts'
      )

      const filteredData = setPosts(filterUsers(response))
    }

    fetchData()
  }, [])

  return (
    <div>
      <ul>
        {posts.length === 0 && <li>Loading...</li>}
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>Welome</h1>
      <UsernameForm />
    </>
  )
}

export default App
