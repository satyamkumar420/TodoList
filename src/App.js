import React from "react";
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import style from "./styles/modules/app.module.scss";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO LIST</PageTitle>
        <div className={style.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
