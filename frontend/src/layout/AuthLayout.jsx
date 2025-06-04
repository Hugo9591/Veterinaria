import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 ">
        <Outlet/>{/*Aqui va el 1er componente del authlayout que seria el login, aparece en app.jsx */}
      </main>
    </>
  )
}

export default AuthLayout
