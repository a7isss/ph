import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t, i18n } = useTranslation(); // Initialize translation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, aToken, setAToken } = useContext(AppContext); // Use consistent naming

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { username, password });

      if (data.success) {
        localStorage.setItem('aToken', data.aToken); // Store token in localStorage
        setAToken(data.aToken); // Update context state
        console.log('Token set in localStorage:', data.aToken);
        console.log('Current aToken in context:', aToken);
        toast.success(t('login_successful'));
        navigate('/'); // Redirect to the home page or dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('login_failed'));
    }
  };

  useEffect(() => {
    if (aToken) {
      navigate('/'); // Redirect if already logged in
    }
  }, [aToken, navigate]);

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

        <p className="text-2xl font-semibold">{t('login')}</p>
        <p>{t('please_log_in')}</p>

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
          {t('login')}
        </button>
      </div>
    </form>
  );
};

export default Login;