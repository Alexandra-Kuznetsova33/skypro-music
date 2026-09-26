'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { signup } from '../../services/auth/authApi';
import styles from './signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const username = email.split('@')[0];
      await signup({ email, password, username });
      router.push('/auth/signin');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(
            error.response.data?.message || 'Ошибка при регистрации',
          );
        } else if (error.request) {
          setErrorMessage('Нет соединения с сервером');
        } else {
          setErrorMessage('Неизвестная ошибка');
        }
      } else {
        setErrorMessage('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        placeholder="Почта"
        value={email}
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={onChangeRepeatPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnSignupEnt}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}