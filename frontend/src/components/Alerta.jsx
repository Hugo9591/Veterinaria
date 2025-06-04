import { useState, useEffect } from "react"

function Alerta({alerta}) {

  // const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() =>{
  //     setVisible(false);
  //   }, 3000);

  //   return() => clearTimeout(timer);
  // },[]);

  return (

    <div>

      {/* {visible && <div className={`${ alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600' } bg-gradient-to-r
          text-center p-3 rounded-xl uppercase text-white font-bold text-sm  mb-10`}>
        {alerta.msg}
      </div>} */}

        <div className={`${ alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600' } bg-gradient-to-r
          text-center p-3 rounded-xl uppercase text-white font-bold text-sm  mb-10`}>
        {alerta.msg}
      </div>

    </div>
  )
}

export default Alerta
