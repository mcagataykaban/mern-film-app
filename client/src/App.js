import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout, Menu } from "antd";
import FilmsPage from "./Views/FilmsPage";
const { Header, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
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
            <FilmsPage />
          </Route>
          <Route path="/Admin">
           
          </Route>
        </Switch>

        <Footer style={{ textAlign: "center" }}>Ck ©2021</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
