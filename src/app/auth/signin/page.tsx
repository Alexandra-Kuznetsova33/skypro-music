'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { signin, getToken } from '../../services/auth/authApi';
import styles from './signin.module.css';

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      await signin({ email, password });
      const tokens = await getToken({ email, password });
      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(
            error.response.data?.message || 'Ошибка при авторизации',
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
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnEnter}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Входим...' : 'Войти'}
      </button>
      <Link href="/auth/signup" className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </form>
  );
}