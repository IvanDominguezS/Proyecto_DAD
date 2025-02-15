import { useState } from 'react'
import { useLoginContext } from '../context/LoginContext';
import { Action } from '../interfaces/Action';

export const Pagina_Login = () => {
  
  const{ dispatch } = useLoginContext();

  const[error, setError] = useState<boolean | null>(null);
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleLogin = () => {

    if(username != "" && email != "" && password != "") {

      const login = {
        username: username,
        email: email,
        password: password
      };

      const action: Action = {
        type: "LOGIN",
        payload: login
      };

      dispatch(action);
      setError(false);

    } else {
      setError(true);
    }
    
  }

  return (
    
    <form className="container mt-5" id="login-form">

      <fieldset>
        <legend>Formulario de inicio de sesión</legend>
        <div className="form-group row mb-3">
          <label htmlFor="username" className="col-sm-2 col-form-label">Nombre de usuario:</label>
          <div className="col-sm-10">
            <input type="text" name="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
          <div className="col-sm-10">
            <input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña: </label>
          <div className="col-sm-10">
            <input type="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <button type="button" className="btn btn-dark" onClick={handleLogin}>Iniciar sesión</button>

        {

          error === true ? (
            <p className="text-danger mt-2">No se han rellenado todos los campos.</p>
          ) : error === false && (
            <p className="text-success mt-2">Se ha iniciado sesión correctamente.</p>
          )

        }
      </fieldset>

    </form>
    
  )

}
