import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import MyPage from '@/pages/MyPage'
import Layout from '@/components/Layout'
import { UserProvider } from '@/contexts/UserContext'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
