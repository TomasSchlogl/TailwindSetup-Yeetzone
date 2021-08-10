import "./App.scss";
import React from "react";
import Header from "./components/header";
import About from "./pages/about";
import Home from "./pages/home";
import { Route } from "react-router-dom";
import { gsap } from "gsap";
import { CSSTransition } from "react-transition-group";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
];

function App() {
  const onEnter = (node) => {
    //enter animation
    gsap.from(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: 30,
        delay: 0.6,
        ease: "power3.InOut",
        opacity: 0,
        stagger: {
          amount: 0.6,
        },
      }
    );
  };
  const onExit = (node) => {
    //exit animation
    gsap.to(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: -30,
        ease: "power3.InOut",
        stagger: {
          amount: 0.6,
        },
      }
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        {routes.map(({ path, Component, name }) => (
          <Route key={name} path={path} exact>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={1200}
                classNames="page"
                unmountOnExit
                onExit={onExit}
                onEnter={onEnter}
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </>
  );
}

export default App;
