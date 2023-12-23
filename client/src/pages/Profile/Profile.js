import { Suspense} from 'react';
import ListRecipesUser from '../../components/ListRecipesUser/ListRecipesUser';
import ProfileMenu from './component/ProfileMenu';
import {useRecoilValue} from "recoil"
import { listDisplayState} from "../../state";
import { Outlet } from 'react-router-dom';


function Profile() {
  const showListRecipe = useRecoilValue(listDisplayState)


  return (
    <>
  
  <div className="d-flex flex-fill p-20">
  <ProfileMenu />
  <div className="d-flex flex-column flex-fill">
  <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>

    {showListRecipe && <ListRecipesUser/>}
    </>
  );
}

export default Profile;