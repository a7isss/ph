import React from 'react';
import { assets } from '../assets/assets';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Contact = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div>
      {/* Page Title */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          {t('contact_us')} <span className="text-gray-700 font-semibold"></span>
        </p>
      </div>

      {/* Contact Details */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">{t('our_office')}</p>
          <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: t('address') }}></p>
          <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: t('contact_info') }}></p>
          <p className="font-semibold text-lg text-gray-600">{t('careers_at_prescripto')}</p>
          <p className="text-gray-500">{t('learn_more_about_teams')}</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            {t('explore_jobs')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;