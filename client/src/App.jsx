import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homePage/HomePage'
import { LoginPage } from './pages/loginPage/LoginPage'
import { Navbar } from './components/Navbar'
import { RegisterPage } from './pages/registerPage/RegisterPage'

function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/registro" element= {<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
