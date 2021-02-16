import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('App ', () => {
  const queryClient = new QueryClient()
  test('renders App component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
    const el = screen.getByText(/authenticate with github/i)
    expect(el).toBeInTheDocument()
  })
})
