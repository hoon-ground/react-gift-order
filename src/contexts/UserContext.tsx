import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  email: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider로 감싼 컴포넌트 안에서 사용해야 합니다~')
  return context
}
