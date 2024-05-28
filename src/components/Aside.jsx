import { useState } from "react"
import FormLogin from "./FormLogin"
import FormRegister from "./FormRegister"

const Aside = () => {

  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <aside className="w-2/5 flex bg-slate-gray justify-center p-4 items-center flex-col font-JetBrains" >
        {isLogin ? (<FormLogin switchToSignup={switchToSignup}/>
        ) : (
        <FormRegister switchToLogin={switchToLogin}/>
      )}
        
    </aside>

  )
}

export default Aside