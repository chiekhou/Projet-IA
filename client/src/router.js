import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { rootLoader } from './loaders/rootLoader';
import { getRecipe } from "./apis";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute.js/ProtectedRoute";


const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const SearchComponent = lazy(() => import("./pages/Search/Search"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

const UserPreference = lazy(() => import("./pages/Profile/pages/UserPreferences/UserPreference"))
const UserPreferenceList = lazy(() => import("./pages/Profile/pages/UserPreferences/pages/UserPreferenceList/UserPreferenceList"))
const UserPreferenceForm = lazy(() => import( "./pages/Profile/pages/UserPreferences/pages/UserPreferenceForm/UserPreferenceForm"))

const AdminRecipes = lazy(() =>
  import("./pages/Admin/pages/AdminRecipes/AdminRecipes")
);
const AdminUsers = lazy(() =>
  import("./pages/Admin/pages/AdminUsers/AdminUsers")
);

const AdminRecipesList = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList"
  )
);
const AdminRecipesForm = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm"
  )
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "search",
        element: <SearchComponent/>
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "preference",
            element: <UserPreference />,
            children: [
              {
                index: true,
                loader: async () => redirect("/profile/preference/list"),
              },
              {
                path: "list",
                element: <UserPreferenceList />,
              },
              {
                path: "new",
                element: <UserPreferenceForm />,
              },
              {
                path: "edit/:preferenceId",
                // loader: async ({ params: { preferenceId } }) => getPreference( preferenceId ),
                element: <UserPreferenceForm />,
              },
            ],
          },
          {
            index: true,
            loader: async () => redirect("/profile/preference"),
          },
        ],
        
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "recipes",
            element: <AdminRecipes />,
            children: [
              {
                index: true,
                loader: async () => redirect("/admin/recipes/list"),
              },
              {
                path: "list",
                element: <AdminRecipesList />,
              },
              {
                path: "new",
                element: <AdminRecipesForm />,
              },
              {
                path: "edit/:recipeId",
                loader: async ({ params: { recipeId } }) => getRecipe(recipeId),
                element: <AdminRecipesForm />,
              },
            ],
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            index: true,
            loader: async () => redirect("/admin/recipes"),
          },
        ],
      },
    ],
  },
]);
