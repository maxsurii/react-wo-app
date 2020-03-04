import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * Following properties will be receieved
 * name, placeholder, value, label, error, info, type, onChange, disabled
 * @param {*} props
 */
const TextFieldGroup = props => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

TextFieldGroup.propTyps = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
