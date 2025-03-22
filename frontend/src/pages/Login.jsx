import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Login = () => {
  const { t, i18n } = useTranslation(); // Initialize translation
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, aToken, setAToken } = useContext(AppContext); // Use consistent naming

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

      if (data.success) {
        localStorage.setItem('aToken', data.aToken); // Use consistent naming
        setAToken(data.aToken); // Update context state
        toast.success(t('account_created_successfully'));
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

      if (data.success) {
        localStorage.setItem('aToken', data.aToken); // Use consistent naming
        setAToken(data.aToken); // Update context state
        toast.success(t('login_successful'));
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (aToken) {
      navigate('/');
    }
  }, [aToken]);

  // Language switcher (optional)
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language dynamically
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {/* Language Switcher */}
        <div className="mb-4">
          <button onClick={() => changeLanguage('en')} className="mr-2">English</button>
          <button onClick={() => changeLanguage('ar')}>العربية</button>
        </div>

        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? t('create_account') : t('login')}
        </p>
        <p>{t('please_sign_up_or_log_in')}</p>
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>{t('full_name')}</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>{t('email')}</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>{t('password')}</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === 'Sign Up' ? t('create_account') : t('login')}
        </button>
        {state === 'Sign Up' ? (
          <p>
            {t('already_have_an_account')}{' '}
            <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer">
              {t('login_here')}
            </span>
          </p>
        ) : (
          <p>
            {t('create_new_account')}{' '}
            <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer">
              {t('click_here')}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;