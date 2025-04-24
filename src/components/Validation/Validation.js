import React, { useCallback } from 'react';

import { TranslationContext } from '../../contexts/TranslationContext';

export function useFormWithValidation() {
  const translation = React.useContext(TranslationContext);

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let error;
    if (name === 'confirm' && value !== values.password) {
      error = translation.confirmError;
    } else if (name === 'newPassword' && value === values.oldPassword) {
      error = translation.passwordsIdentical;
    } else if (
      target.validationMessage === 'Введите данные в указанном формате.'
    ) {
      error = target.title;
    } else {
      error = target.validationMessage;
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
    setIsValid(target.closest('form').checkValidity());
  };

  const handleCheck = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const checkboxValues = values[name];
    let newCheckboxValues;
    if (
      checkboxValues.some((v) => {
        return v === value;
      })
    ) {
      newCheckboxValues = checkboxValues.filter((v) => {
        return v !== value;
      });
    } else {
      checkboxValues.push(value);
      newCheckboxValues = checkboxValues;
    }
    setValues({ ...values, [name]: newCheckboxValues });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, handleCheck, errors, isValid, resetForm };
}
