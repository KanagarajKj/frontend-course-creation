import React, { useState } from 'react';
import { useSignupMutation, useLoginMutation, useGoogleLoginMutation } from '../services/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FaGithub } from "react-icons/fa6";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
      // Simple validation for password
    if (!email || !password) {
      toast.error("Please fill in all fields.")
      return;
    }

    if(password?.length < 8) {
      toast.error("Password must greater than 8 characters")
      return;
    }

    if(!isLogin && !userName) {
      toast.error("Please fill in all fields.")
      return;
    }

    // Validate userName for letters only
    const namePattern = /^[A-Za-z]+$/;
    if (!isLogin && !namePattern.test(userName)) {
      toast.error("Username should contain only letters.");
      return;
    }

    if(!isLogin && userName?.length > 25) {
      toast.error("Please enter valid user name.")
      return;
    }

    // Email pattern validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address.')
      return;
    }

  if (isLogin) {
      try {
        const result = await login({ email, password }).unwrap();
        
        if (result?.loginResponse?.token && result?.loginResponse?.refreshToken) {
        localStorage.setItem('token', result?.loginResponse?.token);
        localStorage.setItem('refreshToken', result?.loginResponse?.refreshToken);
        localStorage.setItem("userId", result?.loginResponse?.user?._id)
        toast.success("Login Successful")
        navigate('/home');
      }
      } catch (err) {
        console.error('Login failed:', err);
        toast.error(err?.data?.loginResponse?.message || "Login failed. Please try again."); // Display error message to user
      }
  }

  if (!isLogin) {
    try {
      const result = await signup({ userName, password, email }).unwrap();

      if (result?.signupResponse?.token && result?.signupResponse?.refreshToken) {
        localStorage.setItem('token', result?.signupResponse?.token);
        localStorage.setItem('refreshToken', result?.signupResponse?.refreshToken);
        localStorage.setItem("userId", result?.signupResponse?.user?._id)
        toast.success("Registered Successful")
        navigate('/home');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error(err?.signupResponse?.message || "Signup failed. Please try again.");
    }
  }
  };

  const handleGoogleLogin = async (credentialResponse) => {
  try {
    if (credentialResponse && credentialResponse.credential) {
    const result = await googleLogin({ token: credentialResponse.credential });
    
    if (result?.error) {
      toast.error(result?.error?.data?.loginResponse?.message);
      return;
    }

    if (result?.data?.loginResponse?.token && result?.data?.loginResponse?.refreshToken) {
      localStorage.setItem('token', result.data.loginResponse.token);
      localStorage.setItem('refreshToken', result.data.loginResponse.refreshToken);
      localStorage.setItem("userId", result?.data?.loginResponse?.user?._id)
      toast.success("Login Successful")
      navigate('/home');
    }

  } else {
    toast.error("Try again later");
  }
  } catch (error) {
    console.error('Signup failed:', error);
    toast.error(error?.data?.loginResponse?.message || "Signup || Login failed. Please try again.");
  }
  };

  const loginWithGitHub = () => {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const redirectURI = 'http://localhost:3000/auth/github/callback';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 overflow-hidden">
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
          <input 
            type="userName" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading} 
          onClick={()=> handleSubmit()}
          className={`bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
        >
          {isLoading ? 'Logging in...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <div className="flex items-center justify-center mt-4">
          <button 
            type="button" 
            className="text-blue-500 hover:text-blue-800"
            onClick={() => setIsLogin(!isLogin)} 
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
          {/* {
            isLogin ? (
              <button 
                type="button" 
                className="text-blue-500 hover:text-blue-800"
                onClick={() => alert('Reset password functionality to be implemented.')} // Placeholder for Forgot Password
              >
                Forgot Password?
              </button>
            ) : null
          } */}
        </div>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>


        <div className="flex justify-center w-full mb-3">
          <GoogleLogin
            onSuccess={credentialResponse => {
              handleGoogleLogin(credentialResponse)
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            // theme='filled_blue'
            shape='pill'
            size='large'
            width={100}
          />
        </div>

        <div className="flex justify-center">
          <div
            onClick={loginWithGitHub}
            className="text-sm flex items-center justify-center bg-gray-900 text-white rounded-full w-3/5 py-2 hover:bg-gray-700 transition duration-300"
          >
            <FaGithub className="mr-2" />
            Continue with GitHub
          </div>
        </div>
        
      </div>

        
    </div>
  );
};

export default Auth;
