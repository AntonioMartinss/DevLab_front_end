import { useState } from "react"
import FormLogin from "../components/FormLogin"
import FormRegister from "../components/FormRegister"
import Header from "../components/Header"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="w-auto">
      <Header/>
    <div className="h-screen flex justify-center p-4 items-center font-JetBrains" >
      
        {isLogin ? (<FormLogin switchToSignup={switchToSignup}/>
        ) : (
        <FormRegister switchToLogin={switchToLogin}/>
      )}
        
    </div>
</div>
  )
}

export default Auth