import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { Login } from './Login'
import { AuthContext } from '../context/AuthContext'

type AuthContextValue = React.ComponentProps<typeof AuthContext.Provider>['value']

const renderLogin = (overrides?: Partial<AuthContextValue>) => {
  const login = vi.fn().mockResolvedValue(undefined)
  const signInWithPassword = vi.fn().mockResolvedValue(undefined)
  render(
    <AuthContext.Provider value={{
      isAuthenticated: false,
      loading: false,
      user: null,
      login,
      logout: vi.fn(),
      signInWithPassword,
      register: vi.fn(),
      resetPassword: vi.fn(),
      sendPasswordResetEmail: vi.fn(),
      ...overrides,
    }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  )

  return { login, signInWithPassword }
}

describe('Login page', () => {
  it('signs in with email and password', async () => {
    const user = userEvent.setup()
    const { signInWithPassword } = renderLogin()

    await user.type(screen.getByLabelText(/email/i), 'student@example.com')
    await user.type(screen.getByLabelText(/password/i), 'SuperSecret123!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(signInWithPassword).toHaveBeenCalledWith('student@example.com', 'SuperSecret123!')
  })

  it('calls the Google OAuth flow', async () => {
    const user = userEvent.setup()
    const { login } = renderLogin()

    await user.click(screen.getByRole('button', { name: /continue with google/i }))

    expect(login).toHaveBeenCalledWith('/dashboard')
  })
})
