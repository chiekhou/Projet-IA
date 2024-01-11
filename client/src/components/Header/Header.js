import styles from "./Header.module.scss";
import { useContext, useState } from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context";
import {useSetRecoilState } from 'recoil'
import { chatDisplayState, listDisplayState } from "../../state";

function Header() {
  const { user , signout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const setListDisplay = useSetRecoilState(listDisplayState)
  const setChatDisplay = useSetRecoilState(chatDisplayState)

  return (
    <>
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
    
        <NavLink to="/">
       Projet-IA
        </NavLink>
      </div>
      <NavLink to="search" className="mr-15 btn btn-reverse-primary">
           
            <i className="fa-solid fa-magnifying-glass "> Search</i>
          </NavLink>

          <button onClick={() => setChatDisplay(true) } className="mr-15 btn btn-reverse-primary">
           
            Chat
         </button>

      {user ? (
        <ul className={styles.headerList}>
           <button onClick={() => setListDisplay(true) } className="mr-15 btn btn-reverse-primary">
          <i className="fa-solid fa-heart mr-5"></i>
          <span>Favoris</span>
        </button>
          <NavLink to="/profile" className="mr-15 btn btn-reverse-primary">
            Profil
          </NavLink>
          <NavLink className="mr-15 btn btn-reverse-primary" onClick={() => signout()}>Déconnexion</NavLink>
        </ul>
      ) : (
      <ul className={styles.headerList}>
        {/* <NavLink to="/admin">
          <button className="btn btn-primary mr-15">Admin</button>
        </NavLink> */}

        <NavLink to="register">
        <button className="btn btn-primary">Register</button>
        </NavLink>
        <NavLink to="login">
        <button className="btn btn-primary">Login</button>
        </NavLink>
      </ul>
         )}
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu />
        </>
      )}

    </header>
    </>
  );
}

export default Header;
