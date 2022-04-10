import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Search from "./pages/Search";

import Profile from "./pages/Profile";

import BottomNavigationBar from "./components/BottomNavigationBar";
import Header from "./components/Header";

import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { ConversationContext } from "./providers/ConversationProvider";
import { ActiveConversationContext } from "./providers/ActiveConversationProvider";

const App = () => {

  const funUserAndActiveConversation = (user, activeConversation) => {
    if (user && activeConversation) {
      return true;
    } else {
      return false;
    }
  }

  const { user } = useContext(AuthContext);

  const { activeConversation } = useContext(ActiveConversationContext);

  const BottomNavigationBarRoutes = ["/feed", "/friends", "/messages", "/settings"];
  const headerRoutes = ["/feed", "/friends", "/messages", "/settings"];

  return (
    <Router>
      <div className="min-h-screen h-max flex flex-col">
        <Route exact path={headerRoutes}>
          {user ? <Header /> : <Redirect to="/login" />}
        </Route>
        <Switch>

          <Route exact path="/">
            {user ? <Redirect to="/feed" /> : <Landing />}
          </Route>


          {/* Private routes */}
          <Route exact path="/test" component={Test} />
          <Route exact path="/feed">
            {user ? <Feed /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/chat">
            { funUserAndActiveConversation(user, activeConversation)  ? <Chat /> : <Redirect to="/messages" />}
          </Route>
          <Route exact path="/messages">
            {user ? <Messages /> : <Redirect to="/login" />}
          </Route>


          <Route exact path="/friends">
            {user ? <Friends /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/settings">
            {user ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile/:username">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/search">
            {user ? <Search /> : <Redirect to="/login" />}
          </Route>

          {/* Public routes */}
          <Route exact path="/login">
            {user ? <Redirect to="/feed" /> : <Login />}
          </Route>
          <Route exact path="/landing">
            {user ? <Redirect to="/feed" /> : <Landing />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/feed" /> : <Register />}
          </Route>

        </Switch>
        <Route exact path={BottomNavigationBarRoutes} component={BottomNavigationBar}></Route>
      </div>
    </Router>
  );
}

export default App;