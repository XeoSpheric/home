import React, { useState, useEffect, FormEvent } from 'react';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { updateUserName } from 'utils/supabase-client';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
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
      router.replace('');
    }
  }, [user, router]);

  return <div>Sign In</div>;
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
      await updateUserName(createdUser, fullName);
    }
    setMessage({
      type: 'note',
      content: 'Check your email for the confirmation link.'
    });
    setLoading(false);
  };


  useEffect(() => {
    if (user) {
      router.replace('');
    }
  }, [user, router]);

  return (<div>Sign Up</div>);
};

const Auth = () => {
  const [authType, setAuthType] = useState<string>('signin');

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <div className="relative self-center mt-6 bg-black rounded-lg p-0.5 flex sm:mt-8">
          <button
            type="button"
            onClick={() => setAuthType('signin')}
            className={`${
              authType === 'signin'
                ? 'transistion-all ease-in-out duration-200 relative w-1/2 bg-lightBlack shadow-sm text-white rounded m-1 py-2 text-sm font-medium whitespace-nowrap hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-cyan hover:ring-opacity-50 hover:z-10 sm:w-auto sm:px-8'
                : 'transistion-all ease-in-out duration-200 relative w-1/2 bg-transparent shadow-sm text-white rounded m-1 py-2 text-sm font-medium whitespace-nowrap hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthType('signup')}
            className={`${
              authType === 'signup'
                ? 'transistion-all ease-in-out duration-200 relative w-1/2 bg-lightBlack shadow-sm text-white rounded m-1 py-2 text-sm font-medium whitespace-nowrap hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8'
                : 'transistion-all ease-in-out duration-200 relative w-1/2 bg-transparent shadow-sm text-white rounded m-1 py-2 text-sm font-medium whitespace-nowrap hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8'
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
