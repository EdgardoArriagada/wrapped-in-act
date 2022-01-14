import App from './App'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import mockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const DUMMY_RESPONSE = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' },
  { id: 3, title: 'baned post' },
  { id: 4, title: 'banned post' },
]

const getMockAdapter = () =>
  new mockAdapter(axios)
    .onGet('https://jsonplaceholder.typicode.com/posts')
    .reply(200, DUMMY_RESPONSE)

const setUp = () => {
  getMockAdapter()
  return render(<App />)
}

describe('App component', () => {
  // test with "not wrapped in act(...)." warning
  it('should should not return "baned post"', () => {
    const bannedTitle = 'baned post'
    // uncomment the following line to see why it doesn't work
    // const bannedTitle = 'baned post'
    setUp()

    expect(screen.queryByText(bannedTitle)).toBeNull()
  })

  it('should should not return "baned post"', async () => {
    const bannedTitle = 'banned post'
    // uncomment the following line to see the error
    // const bannedTitle = 'baned post'

    setUp()

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    expect(screen.queryByText(bannedTitle)).not.toBeInTheDocument()
  })
})
