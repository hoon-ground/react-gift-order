import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import MyPage from '@/pages/MyPage'
import OrderPage from '@/pages/OrderPage'
import Layout from '@/components/Layout'
import { UserProvider } from '@/contexts/UserContext'
import { ROUTE } from '@/constants/routes.ts'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTE.MAIN} element={<MainPage />} />
            <Route path={ROUTE.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE.MY} element={<MyPage />} />
            <Route path={ROUTE.ORDER()} element={<OrderPage />} />
            <Route path={ROUTE.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
