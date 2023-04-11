import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Admin from '../models/Admin';
import { doFetch } from '../../utils';

import styles from '../../assets/styles/login.module.scss';

const schema = z.object({
  username: z.string().min(1, { message: 'Enter your username to proceed' }),
  password: z.string().min(1, { message: 'Enter your password to proceed' }),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<Admin>({ 
    resolver: zodResolver(schema),
    defaultValues: new Admin(),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => doFetch('api/auth/login', 'POST', getValues()),
    onSuccess: () => {
      navigate('/');
    }
  });

  const onSubmit = handleSubmit(() => {
    mutate();
  });

  return (
    <form onSubmit={onSubmit} className={styles.loginContainer}>
      <div className="inputItem">
        <label htmlFor="username">Enter your username</label>
        <input 
          id="username" 
          placeholder="john@doe.com" 
          autoComplete="username"
          {...register('username')} 
        />

        {
          errors.username && (
            <span className="inputError">{errors.username.message }</span>
          )
        }
      </div>

      <div className="inputItem">
        <label htmlFor="password">Enter your password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="********" 
          autoComplete="current-password"
          {...register('password')} 
        />

        {
          errors.password && (
            <span className="inputError">{errors.password.message }</span>
          )
        }
      </div>

      <button onSubmit={onSubmit} disabled={isLoading}>
        <span>
          {
            isLoading
              ? 'Authenticating ...'
              : 'Login'
          }
        </span>
      </button>

      <strong>
        {'Don\'t have an account yet? Register here.'}
      </strong>
    </form>
  );
};

export default LoginForm;
