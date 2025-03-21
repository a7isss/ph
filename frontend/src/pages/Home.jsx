import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Home = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'right', margin: '10px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          {t('login')} {/* Replace hardcoded text with translation key */}
        </button>
      </div>
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;