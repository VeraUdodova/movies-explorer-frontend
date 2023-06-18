import {Route, Routes} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile"
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";

function App() {
    const loggedIn = true;

    return (
        <div className="App">
            <Header loggedIn={loggedIn}/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/saved-movies" element={<SavedMovies/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>
            </Routes>
            <Footer loggedIn={loggedIn}/>
        </div>
    );
}

export default App;
