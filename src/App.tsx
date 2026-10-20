import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Category from './pages/Category'
import Challenge from './pages/Challenge'
import Meditation from './pages/Meditation'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kategoria/:id" element={<Category />} />
        <Route path="vyzva/:id" element={<Challenge />} />
        <Route path="meditacia/:id" element={<Meditation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
