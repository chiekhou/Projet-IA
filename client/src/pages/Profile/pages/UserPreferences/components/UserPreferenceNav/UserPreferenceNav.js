import { NavLink } from "react-router-dom";
import styles from "../UserPreferenceNav/UserPreferenceNav.module.scss";

function UserPreferenceNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        Liste des preferences
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="new"
      >
        Ajouter une preference
      </NavLink>
    </ul>
  );
}

export default UserPreferenceNav;
