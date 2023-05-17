import { useEffect, useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValidValues = Object.entries(values)
        .filter(v => v[0].includes('Valid'))
        .map(v => v[1])
        .every(v => v === true);

      setIsFormValid(isValidValues);
    }, 100);

    return () => clearTimeout(timer);
  }, [values]);

  const changeHandler = (event) => {
    setValues((state) => {
      return {
        ...state,
        [event.target.id]: event.target.value,
      };
    });
  };

  const blurHandler = (event, validator) => {
    setValues((state) => {
      return {
        ...state,
        [event.target.id + 'Valid']: validator(event.target.value),
      };
    });
  };

  const doPasswordMatch = (event) => {
    setValues((state) => {
      return {
        ...state,
        [event.target.id + 'Valid']: values?.password === values[event.target.id],
      };
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    formValues: values,
    isFormValid,
    changeHandler,
    blurHandler,
    doPasswordMatch,
    resetValues,
    setValues
  };
};
