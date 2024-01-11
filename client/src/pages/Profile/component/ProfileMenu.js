import { NavLink } from "react-router-dom";
import styles from "../component/ProfileMenu.module.scss";

function ProfileMenu() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="/"
      >
        Recette
      </NavLink>
    </ul>
  );
}

export default ProfileMenu;
