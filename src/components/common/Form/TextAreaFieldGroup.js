import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * Following properties will be receieved
 * name, placeholder, value, label, error, info, type, onChange, disabled
 * @param {*} props
 */
const TextAreaFieldGroup = props => {
  return (
    <div className="form-group">
      <textarea
        placeholder={props.placeholder}
        name={props.name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        value={props.value}
        onChange={props.onChange}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTyps = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
