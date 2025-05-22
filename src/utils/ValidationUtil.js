/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import * as yup from 'yup';

/*********************************************************
 *
 *  Custom hooks hook forms
 *
 ********************************************************/
// hook for single field
const ValidationType = {
  required: 'required',
  minLength: 'min_length',
  character: 'character',
  confirmPassword: 'confirm_password',
  equalLength: 'equal_length',
  greaterTime: 'greater_time',
  email: 'email',
  url: 'url',
  alphabetic: 'alphabetic',
  alphanumeric: 'alphanumeric',
  space: 'space',
  phone: 'phone',
  cnic: 'cnic',
  term: 'term',
};
const Regex = {
  alphabets: /^[a-zA-Z ]+$/,
  alphanumeric: /^[a-zA-Z0-9 ]+$/,
  phoneRegExp: /^[0-9]{11}$/,
  cnic: /^[0-9]{13}$/,
  // phoneRegExp:
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  space: /^\S*$/,
  lowerCase: /^(?=.*[a-z])/,
  upperCase: /^(?=.*[A-Z])/,
  numeric: /^(?=.*[0-9])/,
  special: /^(?=.*[!@#$%^&*])/,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
};

const strings = (_type, label) => {
  const validation = {
    space: `Enter a valid ${label}`,
    enter: 'Please enter',
    cnic: `Enter a valid ${label}`,
    select: 'Select',
    max_characters: 'Max characters',
    required: `Please enter ${label}`,
    min_length: `Must have ${label} characters or longer`,
    greater_time: `End time must be greater than Start time`,
    equal_length: `Must be ${label} characters`,
    required_select: `Please select ${label}`,
    email: `Please enter valid email address`,
    number: `Enter a valid ${label}`,
    userName: `Enter a valid ${label}`,
    alreadyInUse: `${label} already in use`,
    url: `Enter a valid url`,
    password: `Enter ${label} of 8-16 characters with at least 1 uppercase and 1 special character`,
    alphanumeric: `Enter a valid ${label}`,
    alphabetic: `Enter a valid ${label}`,
    confirm_password_match: `Password and confirm password should be same`,
    new_old_password_match: 'Old and new password should not be same',
    otp: 'Enter the 4 digit code',
    phone: 'Enter a valid mobile number',
    emailMobile: 'Enter a valid email address or mobile number',
    character: `Must have 1 ${label} character`,
    confirm_password: 'Passwords must match',
    term: `Please accept ${label}`,
  };

  return `${validation[_type]}`;
};

const displayMsg = (label, type) => {
  const _type = type ?? ValidationType.required;
  return strings(_type, label);
};

export const Validation = {
  required: (title, type = ValidationType.required, valueType = 'string') => {
    if (valueType === 'object') {
      return yup[valueType]().nullable(true).required(displayMsg(title, type));
    } else if (valueType === 'array') {
      return yup.array().min(1, displayMsg(title, type));
    }

    return yup[valueType]()
      .nullable(true)
      .trim?.()
      .required(displayMsg(title, type));
  },

  requiredWithoutTrim: (
    title,
    type = ValidationType.required,
    valueType = 'string',
  ) => {
    if (valueType === 'object') {
      return yup[valueType]().nullable(true).required(displayMsg(title, type));
    } else if (valueType === 'array') {
      return yup.array().min(1, displayMsg(title, type));
    }

    return (
      yup[valueType]()
        .nullable(true)
        // .trim?.()
        .required(displayMsg(title, type))
    );
  },

  notRequired: () => yup.string().notRequired(),

  email: title =>
    yup
      .string()
      .required(displayMsg(title))
      .email(displayMsg(title, ValidationType.email)),

  alphanumeric: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.alphanumeric,
        displayMsg('Fullname', ValidationType.alphanumeric),
      ),

  phone: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.phoneRegExp,
        displayMsg('lowerCase', ValidationType.phone),
      ),

  cnic: title =>
    yup
      .string()
      .required(displayMsg(title))

      .matches(Regex.cnic, displayMsg(title, ValidationType.cnic)),

  // password should not be same as old password
  notSamePassword: (title, password) =>
    yup
      .string()
      .required(displayMsg(title))
      .notOneOf([password], displayMsg(title, ValidationType.confirmPassword)),

  password: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.space, displayMsg('password', ValidationType.space))
      .matches(/^(?=.{6,})/, displayMsg('6', ValidationType.minLength))
      .matches(
        Regex.lowerCase,
        displayMsg('lowerCase', ValidationType.character),
      )
      .matches(
        Regex.upperCase,
        displayMsg('upperCase', ValidationType.character),
      )
      .matches(Regex.numeric, displayMsg('numeric', ValidationType.character))
      .matches(Regex.special, displayMsg('special', ValidationType.character)),

  passwordMatch: (matchFieldName, label) =>
    yup
      .string()
      .required(displayMsg(label))
      .test(
        'match',
        displayMsg('', ValidationType.confirmPassword),
        function (val) {
          return val === this.parent?.[matchFieldName] ?? '';
        },
      ),
  checkFieldEmpty: (checkFieldName, label) =>
    yup
      .string()
      .nullable()
      .test('checkField', displayMsg(label), function (val) {
        const checkFieldValue = this.parent?.[checkFieldName] ?? '';
        console.log('condition', checkFieldValue !== '' || val !== '');
        //return true;
        return checkFieldValue !== '' || val !== '';
      }),

  length: (title, _length) =>
    yup
      .string()
      .required(displayMsg(title))
      .test('len', displayMsg(_length, ValidationType.equalLength), val => {
        const valueLength = val?.length ?? 0;
        return valueLength === _length;
      }),

  webUrl: (title, req) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.url, displayMsg(title, ValidationType.url)),

  optionalwebUrl: (title, req) =>
    yup
      .string()
      .nullable()
      .notRequired()
      .when('website_url', {
        is: website_url => website_url !== '',
        then: Validation.webUrl('Website Url'),
      }),
  term: title =>
    yup.bool().oneOf([true], displayMsg(title, ValidationType.term)),

  termNotRequired: title =>
    yup
      .bool()
      // .oneOf([!false], displayMsg(title, ValidationType.term))
      .notRequired(),
};

export const useHookField = (formObj, name) => {
  const { control, formState } = formObj;
  const { errors } = formState;
  const inputRef = useRef(null);

  const error = errors?.[name]?.message ?? undefined;

  return {
    forwardRef: inputRef,
    control,
    name,
    error,
  };
};

// hook for form
export const useHookForm = (
  inputs,
  defaultValues = {},
  resolver = undefined,
) => {
  const formObj = useForm({
    resolver: yupResolver(resolver),
    defaultValues: defaultValues,
  });
  const hookInputs = [formObj];
  for (let i = 0; i < inputs.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    hookInputs.push(useHookField(formObj, inputs[i]));
  }
  return hookInputs;
};

/*********************************************************
 *
 *  Validation schema with respect to app
 *
 ********************************************************/
export const ValidationSchema = {
  logIn: yup.object().shape({
    email: Validation.email('Email'),
    password: Validation.requiredWithoutTrim('Password'),
    term: Validation.termNotRequired('remember me'),
  }),
  changeEmail: yup.object().shape({
    email: Validation.email('Email'),
  }),
  job: yup.object().shape({
    job: Validation.required('Job title'),
  }),
  where: yup.object().shape({
    location: Validation.required('Location'),
    currentLocation: Validation.required('Current Location'),
    startDate: Validation.required('Start Date'),
  }),
  ForgotPassword: yup.object().shape({
    email: Validation.email('user name/Email'),
  }),
  what: yup.object().shape({
    // industry: Validation.required('Industry'),
    // type: Validation.required('Type'),
    // position: Validation.required('Position'),
    // experience: Validation.required('Experience'),
    between: Validation.required('Between'),
    and: Validation.required('And'),
    // currency: Validation.required('Currency'),
    negotiable: Validation.required('Negotiable'),
  }),
  projectName: yup.object().shape({
    projectname: Validation.requiredWithoutTrim('project name'),
  }),
  getNotes: yup.object().shape({
    notes: Validation.requiredWithoutTrim('notes'),
  }),
  ResetPassword: yup.object().shape({
    password: Validation.password('password'),
    confirmPassword: Validation.passwordMatch('password', 'confirm password'),
  }),
  newPassword: yup.object().shape({
    password: Validation.password('Password'),
    confirmpassword: Validation.passwordMatch('password', 'confirm password'),
  }),
  resetPassword: yup.object().shape({
    email: Validation.email('Email'),
  }),
  SignUpOne: yup.object().shape({
    email: Validation.email('Email'),
    firstname: Validation.requiredWithoutTrim('First name'),
    lastname: Validation.requiredWithoutTrim('Last name'),
    phone: Validation.requiredWithoutTrim('phone number'),
  }),
  SignUpTwo: yup.object().shape({
    password: Validation.password('password'),
    confirmPassword: Validation.passwordMatch('password', 'confirm password'),
    term: Validation.term('terms & conditions'),
  }),
  terms: yup.object().shape({
    term: yup.boolean().oneOf([true], 'You must accept the terms'),
  }),
};

export default { ValidationSchema, useHookField, useHookForm };
