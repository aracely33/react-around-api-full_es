import React from "react";

function PopupWithForm(props) {
  ///validación de formulario
  const [errors, setErrors] = React.useState({});
  function handleInput(event) {
    if (!event.target.validity.valid) {
      const err = {};
      err[event.target.name] = event.target.validationMessage;
      setErrors({ ...errors, ...err });
    } else {
      const err = {};
      err[event.target.name] = "";
      setErrors({ ...errors, ...err });
    }
  }

  function hasErrors() {
    return Object.keys(errors).some((item) => {
      return errors[item] !== "";
    });
  }

  return (
    <>
      <div className="popup__container popup__container_function-form">
        <form
          className="form popup__form"
          noValidate
          name={props.name}
          onInput={handleInput}
        >
          <fieldset className="form__fields form__set">
            <h2 className="form__heading">{props.title}</h2>
            <div className="form__field">
              {props.inputs.map(
                ({
                  type,
                  placeholder,
                  name,
                  id,
                  minLength,
                  maxLength,
                  onChange,
                  value,
                  ref,
                }) => {
                  return (
                    <React.Fragment key={id}>
                      <input
                        type={type}
                        className={`form__input  popup__input form__input_${name} ${
                          errors.name ? "popup__input_type_error" : ""
                        }`}
                        placeholder={placeholder}
                        name={name}
                        key={id}
                        minLength={minLength || null}
                        maxLength={maxLength || null}
                        onChange={onChange ? (e) => onChange(e) : null}
                        ref={ref || null}
                        value={value /*|| value === "" ? value : undefined*/}
                        required
                      />

                      <span
                        className={`popup__error ${
                          errors.name ? "popup__error_visible" : ""
                        }`}
                      >
                        {errors.name}
                      </span>
                    </React.Fragment>
                  );
                }
              )}
            </div>
            <button
              className={`form__Button form__submit popup__button pointer ${
                hasErrors() ? "popup__button_disabled" : ""
              }`}
              type="submit"
              onClick={(e) => props.onSubmit(e)}
              disabled={hasErrors()}
            >
              {props.action}
            </button>
          </fieldset>
        </form>
        <button
          className="close-button pointer"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </>
  );
}

export default PopupWithForm;
