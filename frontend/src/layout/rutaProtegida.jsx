import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header";
import useAuth from "../hooks/useAuth"
import Footer from "../components/Footer";

// useAuth para sacar inf del context

function RutaProtegida() {

    const { auth, cargando } = useAuth();
    //console.log(auth);
    //console.log(cargando);

    if(cargando) return 'Cargando...'

  return (
    <>
        <Header />
    
        {/* //Si auth tiene algo, muestra el outlet si no regresa a raiz tambien para cerrar sesion ponemos el auth vacio para que cuando no encuente nada me mande a /  */}
        {auth?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) : <Navigate to='/' />} 

        <Footer />
    </>
  )
}

export default RutaProtegida