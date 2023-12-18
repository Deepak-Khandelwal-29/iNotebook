import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useState} from "react";

function App() {
    const [alert, setAlert] = useState(null)
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => setAlert(null), 1500)
    }
    return (

        <Router>
            <NavBar/>
            <NoteState>
                <Alert alert={alert}/>
                <div className={"container my-3"}>
                    <Routes>
                        <Route path={'/'} element={<Home showAlert={showAlert}/>}></Route>
                        <Route path={'/about'} element={<About/>}></Route>
                        <Route path={'/login'} element={<Login showAlert={showAlert}/>}></Route>
                        <Route path={'/signup'} element={<Signup showAlert={showAlert}/>}></Route>
                    </Routes>
                </div>
            </NoteState>
        </Router>

    );
}

export default App;
