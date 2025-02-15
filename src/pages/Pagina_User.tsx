import { useState } from 'react'
import { useLoginContext } from '../context/LoginContext';
import { Action } from '../interfaces/Action';

export const Pagina_User = () => {

  const { state, dispatch } = useLoginContext();

  const [username, setUsername] = useState(state.username);
  const [email, setEmail] = useState(state.email);
  const [password, setPassword] = useState(state.password);

  const [isDisabled, setIsDisabled] = useState<boolean[]>([true, true, true]);

  const handleLogout = () => {
    const action: Action = {
      type: "LOGOUT"
    }

    dispatch(action);
  }

  const handleEditField = (field: number) => {
    const newDisabled = isDisabled.map(
      (disabled, index) => field === index ? !disabled : disabled
    );

    setIsDisabled(newDisabled);
  }

  const changeStateUsername = () => {
    const action: Action = {
      type: "CHANGE_USERNAME",
      payload: username
    }

    handleEditField(0); //Vuelve a deshabilitar el campo.
    dispatch(action);
  }

  const changeStateEmail = () => {
    const action: Action = {
      type: "CHANGE_EMAIL",
      payload: email
    }

    handleEditField(1);
    dispatch(action);
  }

  const changeStatePassword = () => {
    const action: Action = {
      type: "CHANGE_PASSWORD",
      payload: password
    }

    handleEditField(2);
    dispatch(action);
  }

  if (state.username === "" || state.email === "" || state.password === "") {
    return (
      <div className="container mt-3">
        <h2 className='text-center mb-4'>Información del usuario: </h2>
        <p className="fs-5 text-secondary">No se ha iniciado sesión.</p>
      </div>
    )
  }

  else return (
    <div className="container mt-3">
      <h2 className='text-center mb-4'>Información del usuario:</h2>
      <form className="row align-items-end">
        <div className="form-group col-6">
          <label htmlFor="username" className="col-sm-2 col-form-label">Nombre de usuario:</label>

          {

            isDisabled[0] && (
              <div className="input-group">
                <input type="text" name="username" className="form-control" value={username} disabled={true} onChange={(e) => setUsername(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleEditField(0)}>Cambiar</button>
              </div>
            ) || (
              <div className="input-group">
                <input type="text" name="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className="btn btn-outline-primary" type="button" onClick={() => { changeStateUsername() }}>Confirmar cambio</button>
              </div>
            )

          }

        </div>

        <div className="form-group col-6">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>

          {

            isDisabled[1] && (
              <div className="input-group">
                <input type="email" name="email" className="form-control" value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleEditField(1)}>Cambiar</button>
              </div>
            ) || (
              <div className="input-group">
                <input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-outline-primary" type="button" onClick={() => changeStateEmail()}>Confirmar cambio</button>
              </div>
            )

          }

        </div>

        <div className="form-group col-6">
          <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña: </label>

          {
            isDisabled[2] && (
              <div className="input-group">
                <input type="password" name="password" className="form-control" value={password} disabled={true} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleEditField(2)}>Cambiar</button>
              </div>
            ) || (
              <div className="input-group">
                <input type="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-outline-primary" type="button" onClick={() => changeStatePassword()}>Confirmar cambio</button>
              </div>
            )
          }

          
        </div>

        <div className="form-group">
          <button className="btn btn-secondary mt-3" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </form>

    </div>
  )
}
