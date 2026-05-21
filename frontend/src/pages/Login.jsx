import { FcGoogle } from "react-icons/fc"

function Login() {

  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:8080/api/auth/login"
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Login
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-lg py-3 hover:bg-slate-50 transition-colors"
        >

          <FcGoogle size={24} />

          <span className="font-medium">
            Continue with Google
          </span>

        </button>

      </div>

    </div>
  )
}

export default Login