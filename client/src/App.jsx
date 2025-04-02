import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homePage/HomePage'
import { LoginPage } from './pages/loginPage/LoginPage'
import { Navbar } from './components/Navbar'
import { RegisterPage } from './pages/registerPage/RegisterPage'
import { CrudPage } from './pages/crudPage/CrudPage'
import { MicuentaPage } from './pages/miCuenta/MicuentaPage'
import { ValidateUserPage } from './pages/validateUser/ValidateUserPage'

function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/registro" element= {<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/crud" element={<CrudPage />} />
                <Route path="/micuenta" element={<MicuentaPage />}/>
                <Route path="/validar-usuario/:email" element={<ValidateUserPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
