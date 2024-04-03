import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./view/pages/login/login";
import Register from "./view/pages/register/register";
import Landing from "./view/pages/landing/landing";
import Dashboard from "./view/pages/dashboard/dashboard";
import Agrupacion from "./view/pages/agrupacion/agrupacion";
import MenuAgrup from "./view/pages/menuAgrup/menuAgrup";
import Perfil from "./view/pages/Perfil/Perfil";
import CategoriesDash from "./view/pages/dashboard/categoriesDash";
import NewCategory from "./view/pages/dashboard/newCategory";
import Donaciones from "./view/pages/donaciones/donaciones";
import Testimonio from "./view/pages/Testimonio/Testimonio";
import New_Group from "./view/pages/New_Group/New_Group";
import { ProtectedRouteDash, ProtectedRouteMenu, ProtectedRouteAgrupacion, ProtectedRoutePerfil, ProtectedRouteDonaciones } from "./view/components/protectedRoutes/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import authService from "./controller/services/AuthService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService.auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }

      setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/login" element={<Login user={user} />}></Route>

          <Route
            exact
            path="/register"
            element={<Register user={user} />}
          ></Route>

          <Route exact path= "/dashboard" element={<Dashboard />}></Route>


          <Route exact path="/dashboard/:id" element={<CategoriesDash />}></Route>


          <Route exact path="/menuAgrup" element={
            <ProtectedRouteMenu user={user}>
              <MenuAgrup />
            </ProtectedRouteMenu>
          }
          ></Route>

          <Route
            exact
            path="/agrupacion/:id"
            element={
              <Agrupacion />
              // <ProtectedRouteAgrupacion user={user}>

              // </ProtectedRouteAgrupacion>
            }
          ></Route>

          <Route
            exact
            path="/donaciones"
            element={
              <ProtectedRouteDonaciones user={user}>
                <Donaciones />
              </ProtectedRouteDonaciones>
            }
          ></Route>

          <Route
            exact
            path="/Perfil"
            element={
              <ProtectedRoutePerfil user={user}>
                <Perfil />
              </ProtectedRoutePerfil>
            }
          ></Route>
          <Route exact path="/testimonio/:id" element={<Testimonio />}></Route>
          <Route exact path="/New_Group" element={<New_Group />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
