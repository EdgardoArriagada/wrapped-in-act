import { useState } from 'react'

const sleep = async (t: number) => new Promise((resolve, reject) => setTimeout(resolve, t))

const UsernameForm = () => {
  const [formStatus, setFormStatus] = useState<'default' | 'pending' | 'submitted'>()

  const handleSubmit = async (e: any) => {
    setFormStatus('pending')

    e.preventDefault()

    await sleep(2000)

    setFormStatus('submitted')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <button type="submit">Submit</button>
      <span>{formStatus === 'pending' ? 'Saving...' : null}</span>
      <span>{formStatus === 'submitted' ? 'Submitted!' : null}</span>
    </form>
  )
}

function App() {
  return (
    <>
      <h1>Welome</h1>
      <UsernameForm />
    </>
  );
}

export default App;
