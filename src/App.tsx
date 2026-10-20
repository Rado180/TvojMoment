import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Category from './pages/Category'
import Challenge from './pages/Challenge'
import Meditation from './pages/Meditation'
import Login from './pages/Login'
import NewPassword from './pages/NewPassword'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import { AuthProvider } from './lib/auth'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kategoria/:id" element={<Category />} />
          <Route path="vyzva/:id" element={<Challenge />} />
          <Route path="meditacia/:id" element={<Meditation />} />
          <Route path="prihlasenie" element={<Login />} />
          <Route path="nove-heslo" element={<NewPassword />} />
          <Route path="ucet" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
