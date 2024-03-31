import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    fullName: yup.string().required('Username is required').min(4),
    password: yup.string().required('Password is required').min(6),
    email: yup.string().required('Email is required').email()
  });


  export const loginSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(6),
    email: yup.string().required('Email is required').email()
  });