import "./App.css";
import React, {useState, useEffect} from "react";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout, Menu } from "antd";
import FilmsPage from "./Views/FilmsPage";
import AdminPage from "./Views/AdminPage";
const { Header, Footer } = Layout;

function App() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/films")
      .then((res) => res.json())
      .then((data) => setFilms(data));
  }, []);
  return (
    <BrowserRouter>
      <Layout style={{height: '100vh'}} className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Films</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/Admin">Admin</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Switch>
          <Route path="/" exact>
            <FilmsPage films={films} setFilms={setFilms} />
          </Route>
          <Route path="/Admin">
            <AdminPage films={films} setFilms={setFilms} />
          </Route>
        </Switch>
        <Footer style={{ textAlign: "center" }}>Ck ©2021</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
