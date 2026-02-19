import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('renders Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /OCTest React 版/i })).toBeInTheDocument()
  })

  it('renders Blog list page', () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /2026 居家照护并购趋势/i })).toBeInTheDocument()
  })

  it('renders Blog detail page by slug', () => {
    render(
      <MemoryRouter initialEntries={['/blog/home-care-ma-2026-cn-analysis']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText(/原文链接：https:\/\/homehealthcarenews.com/i)).toBeInTheDocument()
  })
})
