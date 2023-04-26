import { useState } from "react";
import Logo from "./assets/logo_yellow.png";
import SearchIcon from "./assets/icons/search.svg";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import { Outlet } from "react-router-dom";
 

function App() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClickSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${search}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-container">
          <img src={Logo} className="app-logo" alt="logo" />
          <form onSubmit={handleClickSearch}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Nunca dejes de buscar"
            ></input>
          </form>
          <button onClick={handleClickSearch}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
