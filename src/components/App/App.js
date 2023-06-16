import {Route, Routes} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Register from "../Register/Register";


function App() {
    const headerAndFooterNotShow = ['/signin', '/signup'].includes(window.location.pathname);
    const loggedIn = false;

    return (
        <div className="App">
            {headerAndFooterNotShow ? "" : <Header loggedIn={loggedIn}/>}
            <Routes>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>
            </Routes>
            <Main/>
            {headerAndFooterNotShow ? "" : <Footer loggedIn={loggedIn}/>}
        </div>
    );
}

export default App;
