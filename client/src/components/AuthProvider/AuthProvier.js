import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {AuthContext} from '../../context'
import { login as signin , signout as logout} from '../../apis/auth'

function AuthProvider ({children}) {

    const initialUser = useLoaderData();
    const [user, setUser] = useState(initialUser)

    async function login(credentials){
        const newUser = await signin(credentials)
        setUser(newUser)
    }

    async function signout() {
        await logout();
        setUser(null);
      }

    return <AuthContext.Provider value={{user,login,signout }}  >{children}</AuthContext.Provider>;
}
export default AuthProvider