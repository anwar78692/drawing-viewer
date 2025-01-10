'use client';

import { useState, useEffect } from 'react';
import { signUp, signIn } from './utils/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  // Ensure hydration happens before rendering dynamic content
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const handleAuth = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      // alert('Please enter email and password');
      return;
    }

    if (isSigningUp) {
      const { error } = await signUp(email, password);
      if (!error) {
        toast.success('Sign-up successful!');
        // alert('Sign-up successful!');
        router.push('/upload');
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) {
        toast.success('Sign-in successful!');
        // alert('Sign-in successful!');
        router.push('/upload');
      }
    }
  };



  if (!isHydrated) return null; // Prevent mismatched rendering during hydration

  return (
    <div>
      <div className="max-w-md mx-auto p-6 shadow-md rounded">
        <h1 className="text-xl font-bold mb-4">Welcome to Drawing App</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />
        <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isSigningUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p className="mt-4 text-sm">
          {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-blue-500 cursor-pointer underline"
          >
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
