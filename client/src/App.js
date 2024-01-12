import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useRecoilValue } from 'recoil';
import { chatDisplayState } from "./state";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import AuthProvider from "./components/AuthProvider/AuthProvier";
import Chatbot from "./pages/Chatbot/Chatbot";


function App() {

  const showChatDisplay = useRecoilValue(chatDisplayState)

  return (
    <>
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
      <Header />
      <div className="flex-fill d-flex flex-column">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      </AuthProvider>
    </div>

{showChatDisplay && <Chatbot/>}
</>
  );
}

export default App;
