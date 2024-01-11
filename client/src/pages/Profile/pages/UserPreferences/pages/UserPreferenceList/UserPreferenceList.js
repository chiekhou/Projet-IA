import { useState, useEffect } from 'react';
import styles from "./UserPreferenceList.module.scss";
import { deletePreference as deleteR, getAllPreferenceByUser } from "../../../../../../apis/preference";
import { NavLink } from "react-router-dom";

function UserPreferenceList() {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
 
    const fetchPreferences = async () => {
      try {
        const response = await getAllPreferenceByUser();

        setPreferences(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des preferences :', error);
      }
    };
    fetchPreferences();
  }, []);

  async function deletePreference(id_preference) {
    await deleteR(id_preference);
    setPreferences(preferences.filter((p) => p.id_preference !== id_preference));
  }

  return (
    <ul className={styles.list}>
      {preferences.length
        ? preferences.map((p) => (
            <li key={p.id_preference} className="d-flex align-items-center">
              <span className="flex-fill">{p.allergies}</span>
              <span className="flex-fill">{p.regimeAlimentaire}</span>
              <span className="flex-fill">{p.medicalConditions}</span>
              <span className="flex-fill">{p.autre}</span>
              <NavLink to={`../edit/${p.id_preference}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deletePreference(p.id_preference)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default UserPreferenceList;
