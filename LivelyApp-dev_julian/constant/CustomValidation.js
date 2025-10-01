import * as Yup from 'yup';

// Text Validation
export const textValidation = ({
  fieldName = 'This field',
  min = 3,
  max = 50,
  hasMaxLimit = true,
  onlyRequired = false,
} = {}) => {
  let schema = Yup.string();
  if (onlyRequired) {
    return schema
      .test(
        'not-empty',
        `${fieldName} cannot be empty or spaces only`,
        value => value && value.trim().length > 0,
      )
      .required(`${fieldName} is required`);
  }
  schema = schema
    .min(min, `${fieldName} must be at least ${min} characters`)
    .matches(
      /[a-zA-Z0-9]/,
      `${fieldName} must contain at least one letter or number`,
    );

  if (hasMaxLimit) {
    schema = schema.max(max, `${fieldName} must be at most ${max} characters`);
  }

  return schema.required(`${fieldName} is required`);
};

export const dropdownValidation = ({fieldName = 'This field'} = {}) => {
  return Yup.mixed()
    .nullable()
    .test('is-valid-dropdown', `${fieldName} is required`, value => {
      return !!value;
    });
};
export const multiDropdownValidation = ({fieldName = 'This field'} = {}) => {
  return Yup.array()
    .min(1, `${fieldName} is required`)
    .of(Yup.mixed().required())
    .nullable();
};

// Email Validation
// export const emailValidation = ({fieldName = 'Email'} = {}) =>
//   Yup.string()
//     .email(`${fieldName} must be a valid email`)
//     .required(`${fieldName} is required`);

export const emailValidation = ({fieldName = 'Email'} = {}) =>
  Yup.string()
    .required(`${fieldName} is required`)
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      `${fieldName} must be a valid (e.g., example@domain.com)`,
    );

export const gstinValidation = ({fieldName = 'GSTIN'} = {}) => {
  const GSTIN_REGEX =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  return Yup.string()
    .required(`${fieldName} is required`)
    .matches(GSTIN_REGEX, `${fieldName} is invalid`);
};

// Password Validation
export const passwordValidation = ({min = 6, max = 20} = {}) =>
  // Yup.string()
  // .min(min, `Password must be at least ${min} characters`)
  // .max(max, `Password must not exceed ${max} characters`)
  // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .matches(/\d/, 'Password must contain at least one number')
  // .matches(
  //   /[@$!%*?&]/,
  //   'Password must contain at least one special character (@$!%*?&)',
  // )
  // .required('Password is required');
  Yup.string()
    .test(
      'not-empty',
      'Password cannot be empty or spaces only',
      value => value && value.trim().length > 0,
    )
    .required('Password is required');

// Confirm Password Validation
export const confirmPasswordValidation = ({
  fieldName = 'Confirm Password',
} = {}) =>
  Yup.string()
    .oneOf([Yup.ref('password'), null], `${fieldName} must match the password`)
    .required(`${fieldName} is required`);

// Number Validation
export const numberValidation = ({
  fieldName = 'Number',
  min = 1,
  max = 100000000,
} = {}) =>
  Yup.number()
    .min(min, `${fieldName} must be at least ${min}`)
    // .max(max, `${fieldName} must be at most ${max}`)
    .required(`${fieldName} is required`);

// Boolean Validation
export const booleanValidation = ({fieldName = 'This field'} = {}) =>
  Yup.boolean().required(`${fieldName} is required`);

// Date Validation
export const dateValidation = ({fieldName = 'Date'} = {}) =>
  Yup.date().required(`${fieldName} is required`);

// Phone Number Validation
// export const phoneValidation = ({fieldName = 'Phone Number'} = {}) =>
//   Yup.string()
//     .matches(/^[0-9]{10}$/, `${fieldName} must be a valid 10-digit number`)
//     .required(`${fieldName} is required`);
export const phoneValidation = ({fieldName = 'Phone Number'} = {}) =>
  Yup.string()
    .test('is-10-digits', `${fieldName} must be exactly 10 digits`, value =>
      value ? /^\d{10}$/.test(value) : true,
    )
    .test(
      'starts-with-6-9',
      `${fieldName} must start with 6, 7, 8, or 9`,
      value => (value ? /^[6-9]/.test(value) : true),
    )
    .required(`${fieldName} is required`);

/**
 * Extracts only numeric digits from a given string.
 * @param {string} value - Input string containing numbers and other characters.
 * @returns {string} - String containing only numeric characters.
 */
export const imageValidation = ({
  fieldName = 'Images',
  isRequired = true,
  min = 1,
  max = 5, // optional max limit
  hasMaxLimit = true,
} = {}) => {
  let schema = Yup.array().of(
    Yup.mixed().test('is-valid-image', 'Invalid image', value => !!value),
  );

  if (isRequired) {
    const minMessage =
      min === 1
        ? `Please select ${fieldName.toLowerCase()}`
        : `${fieldName} must contain at least ${min} image${
            min > 1 ? 's' : ''
          }`;

    schema = schema.min(min, minMessage);
  }

  if (hasMaxLimit) {
    schema = schema.max(max, `${fieldName} must contain at most ${max} images`);
  }

  return schema.required(`${fieldName} is required`);
};

export const extractNumbers = value => value.replace(/[^0-9]/g, '');
