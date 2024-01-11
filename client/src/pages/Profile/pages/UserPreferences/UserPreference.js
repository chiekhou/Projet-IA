import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import UserPreferenceNav from "./components/UserPreferenceNav/UserPreferenceNav";


function UserPreference() {
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des Preferences</h4>
      <div className="flex-fill d-flex flex-column">
        <UserPreferenceNav></UserPreferenceNav>
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default UserPreference;
