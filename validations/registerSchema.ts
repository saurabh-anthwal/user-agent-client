import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(3, 'Too Short!'),
//   confirm_password: Yup.string()
//     .oneOf([Yup.ref('password') as any, null], 'Passwords must match')
//     .required('Required'),
});