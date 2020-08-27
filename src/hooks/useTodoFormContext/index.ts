import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FormEventHandler, useState } from 'react';
import { isDueDateExpired } from '../../util';

export interface TodoFormValues {
  text: string;
  dueDate: MaterialUiPickersDate;
}

export type TodoFormValidators = Record<keyof TodoFormValues, (value: any) => boolean>;

export type TodoFormErrors = Partial<Record<keyof TodoFormValues, boolean>>;

export type TodoFormTouched = Record<keyof TodoFormValues, boolean>;

export interface TodoFormContext {
  values: TodoFormValues;
  errors: TodoFormErrors;
  updateField: (field: keyof TodoFormValues, value: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isValid: boolean;
  touched: TodoFormTouched;
}

const todoFormValidators: TodoFormValidators = {
  text: (value) => !!value,
  dueDate: (value) => !!value && !isDueDateExpired(value),
};

const prepareFormErrors = (values: TodoFormValues): TodoFormErrors => {
  const errors: TodoFormErrors = {};

  const validatorKeys = Object.keys(todoFormValidators) as Array<keyof TodoFormValues>;

  validatorKeys.forEach((fieldName) => {
    if (!todoFormValidators[fieldName](values[fieldName])) {
      errors[fieldName] = true;
    }
  });

  return errors;
};

export const useTodoFormContext = ({
  initialValues,
  onSubmit,
}: {
  initialValues: TodoFormValues;
  onSubmit: (values: TodoFormValues) => void;
}): TodoFormContext => {
  const [values, setValues] = useState<TodoFormValues>(initialValues);
  const [errors, setErrors] = useState<TodoFormErrors>(prepareFormErrors(initialValues));
  const [isValid, setIsValid] = useState<boolean>(Object.keys(errors).length === 0);
  const [touched, setTouched] = useState<TodoFormTouched>({ text: false, dueDate: false });

  const validateForm = (): boolean => {
    const validatorKeys = Object.keys(todoFormValidators) as Array<keyof TodoFormValues>;
    return validatorKeys.every((field) => validateField(field, values[field]));
  };

  const onSubmitHandler: TodoFormContext['onSubmit'] = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setIsValid(false);
      return;
    }

    onSubmit(values);
  };

  const validateField = (field: keyof TodoFormValues, value: any): boolean => {
    const isValid = todoFormValidators[field](value);
    const updatedErrors = { ...errors };

    if (!isValid) {
      updatedErrors[field] = true;
    } else {
      delete updatedErrors[field];
    }

    setIsValid(Object.keys(updatedErrors).length === 0);
    setErrors(updatedErrors);

    return isValid;
  };

  const onUpdateFieldHandler: TodoFormContext['updateField'] = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setValues({ ...values, [field]: value });
    validateField(field, value);
  };

  return {
    values,
    errors,
    updateField: onUpdateFieldHandler,
    onSubmit: onSubmitHandler,
    isValid,
    touched,
  };
};
