import React, { useState, useEffect, FormEvent } from 'react';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { updateUserName } from 'utils/supabase-client';
import Image from 'next/image';
import logo from 'assests/Logo.png';
import s from 'styles/Auth.module.css';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { user, signIn } = useUser();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.'
      });
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: Provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  return (
    <div className="w-1/2 mx-auto sm:py-2 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSignin}>
        <div className="sm:flex sm:flex-col sm:align-center">
          <input
            placeholder="Email"
            type="text"
            className={s.inputField}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className={s.inputField}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={s.submitButton}
            type="submit"
            disabled={!password.length || !email.length}
          >
            Sign In
          </button>
        </div>
      </form>
      {message.content && (
        <div
          className={`${
            message.type === 'error' ? 'text-red' : 'text-green'
          } border ${
            message.type === 'error' ? 'border-red' : 'border-green'
          } p-3 mt-2`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};

const SignUp = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { user, signUp } = useUser();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    const { error, user: createdUser } = await signUp({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (createdUser) {
      await updateUserName(fullName);
    }
    setMessage({
      type: 'note',
      content: 'Check your email for the confirmation link.'
    });
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  return (
    <div className="w-1/2 mx-auto sm:py-2 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSignup}>
        <div className="sm:flex sm:flex-col sm:align-center">
          <input
            placeholder="Full Name"
            type="text"
            className={s.inputField}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            className={s.inputField}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className={s.inputField}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={s.submitButton}
            type="submit"
            disabled={!password.length || !email.length || !fullName.length}
          >
            Sign Up
          </button>
        </div>
      </form>
      {message.content && (
        <div
          className={`${
            message.type === 'error' ? 'text-red' : 'text-green'
          } border ${
            message.type === 'error' ? 'border-red' : 'border-green'
          } p-3 mt-2`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};

const Auth = () => {
  const [authType, setAuthType] = useState<string>('signin');

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <Image
          src={logo}
          alt="xeosmoot.com"
          width="80px"
          height="80px"
          objectFit={'contain'}
        />
      </div>
      <div className="sm:flex sm:flex-col sm:align-center">
        <div className="relative self-center mt-6 bg-black rounded-lg p-0.5 flex sm:mt-8">
          <button
            type="button"
            onClick={() => setAuthType('signin')}
            className={`${
              authType === 'signin' ? `${s.active}` : `${s.inactive}`
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthType('signup')}
            className={`${
              authType === 'signup' ? `${s.active}` : `${s.inactive}`
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>
      {authType === 'signin' ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Auth;
