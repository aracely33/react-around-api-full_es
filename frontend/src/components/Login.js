import React, { useEffect } from "react";
import * as auth from "../utils/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = React.useState({});
  const [infoToolOpen, setInfoToolOpen] = React.useState(false);

  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);

    navigate("/signin", { state: {} });
  };
  const onLogin = (e) => {
    const { password, email } = formData;

    e.preventDefault();
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setFormData({ email: "", password: "" });
          navigate("/");
          handleLogin();
        }
      })
      .catch((err) => {
        setInfoToolOpen(true);
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.state === "success") {
      setInfoToolOpen(true);
    }
  }, [location]);

  return (
    <>
      <div className="login">
        <form action="" className="form form_begin" onSubmit={onLogin}>
          <fieldset className="form__fields form__fields_theme-dark form__set">
            <h2 className="form__heading form__heading_type-form-begin">
              Inicia sesión
            </h2>
            <div className="form__field form__field_theme-dark">
              <label className="form__label">
                <input
                  type="email"
                  className="form__input form__input_theme-dark"
                  placeholder="Correo electrónico"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </label>
              <label className="form__label">
                <input
                  type="password"
                  className="form__input form__input_theme-dark"
                  placeholder="Contraseña"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>

            <button className="form__Button  form__Button_theme-dark form__submit pointer">
              Inicia sesión
            </button>
          </fieldset>

          <Link to="/signup" className="form__link">
            ¿Aún no eres miembro? Regístrate aquí
          </Link>
        </form>
      </div>
      <InfoTooltip
        error={error}
        infoToolOpen={infoToolOpen}
        handleClose={handleCloseInfoTool}
      />
    </>
  );
};

export default Login;
