'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const ReferFriendPage = () => {
  const t = useTranslations('Refer');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'terms', 'form'
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tabs = [
    { id: 'about', label: t('tabs.about') },
    { id: 'terms', label: t('tabs.terms') },
    { id: 'form', label: t('tabs.form') }
  ];

  // Check if both consent checkboxes are checked
  const isSubmitEnabled = consent1 && consent2;

  return (
    <>
      <Head>
        <title>{t('referFriend.pageTitle')}</title>
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0061A7] mb-8 text-center">
            {t('referFriend.heading')}
          </h1>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#0061A7] text-[#0061A7]'
                    : 'border-transparent text-gray-500 hover:text-[#0061A7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">{t('about.title')}</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      {t('about.description1')}
                    </p>
                    <p>
                      {t('about.description2')}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0061A7] mb-3">{t('about.howItWorks.title')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">1.</span>
                      {t('about.howItWorks.step1')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">2.</span>
                      {t('about.howItWorks.step2')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">3.</span>
                      {t('about.howItWorks.step3')}
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">{t('about.benefits.referrer.title')}</h4>
                    <p className="text-gray-700 text-sm">{t('about.benefits.referrer.description')}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">{t('about.benefits.friend.title')}</h4>
                    <p className="text-gray-700 text-sm">{t('about.benefits.friend.description')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">{t('terms.title')}</h2>
                </div>
                <div className="text-sm text-gray-700 space-y-4 whitespace-pre-line">
                  {t('terms.content')}
                </div>
              </div>
            )}

            {/* Form Tab */}
            {activeTab === 'form' && (
              <div>
                {submitted ? (
                  <div className="text-center text-[#0061A7] space-y-4">
                    <h2 className="text-2xl font-bold">{t('referFriend.thankYouTitle')}</h2>
                    <p>{t('referFriend.thankYouMessage')}</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setConsent1(false);
                        setConsent2(false);
                      }}
                      className="mt-4 px-6 py-2 bg-[#0061A7] text-white rounded hover:bg-blue-700 transition"
                    >
                      {t('form.submitAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-[#0061A7] mb-6 whitespace-pre-line">
                      {t('referFriend.intro')}
                    </p>

                    {/* Referrer Section */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('referFriend.referrerSection')}
                      </h2>
                      <div className="space-y-4">
                        <InputField id="referrerName" label={t('referFriend.fields.referrerName')} />
                        <InputField id="referrerEmail" label={t('referFriend.fields.referrerEmail')} type="email" />
                        <InputField id="referrerPhone" label={t('referFriend.fields.referrerPhone')} optional />
                        <RadioGroup
                          name="workedWithLinkedMed"
                          label={t('referFriend.fields.workedWith')}
                          options={[{ label: t('referFriend.yes'), value: 'yes' }, { label: t('referFriend.no'), value: 'no' }]}
                        />
                        <TextareaField id="referrerMessage" label={t('referFriend.fields.referrerMessage')} optional />
                      </div>
                    </section>

                    {/* Candidate Section */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('referFriend.candidateSection')}
                      </h2>
                      <div className="space-y-4">
                        <InputField id="candidateName" label={t('referFriend.fields.candidateName')} />
                        <InputField id="candidateEmail" label={t('referFriend.fields.candidateEmail')} type="email" />
                        <InputField id="candidatePhone" label={t('referFriend.fields.candidatePhone')} optional />
                        <SelectField id="candidateCountry" label={t('referFriend.fields.country')} options={[t('countries.germany'), t('countries.uae'), t('countries.other')]} />
                        <SelectField id="profession" label={t('referFriend.fields.profession')} options={[t('professions.doctor'), t('professions.nurse'), t('professions.pharmacist'), t('professions.other')]} />
                        <InputField id="specialty" label={t('referFriend.fields.specialty')} optional />
                        <SelectField id="experience" label={t('referFriend.fields.experience')} options={[t('experience.junior'), t('experience.mid'), t('experience.senior')]} />
                        <SelectField id="location" label={t('referFriend.fields.location')} options={[t('countries.germany'), t('countries.uae'), t('countries.other')]} />
                        <SelectField id="language" label={t('referFriend.fields.language')} options={[t('languages.a1'), t('languages.a2'), t('languages.b1'), t('languages.b2'), t('languages.notStarted')]} />
                      </div>
                    </section>

                    {/* Consent */}
                    <div className="space-y-3 text-sm text-[#0061A7]">
                      <label className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          checked={consent1}
                          onChange={(e) => setConsent1(e.target.checked)}
                          required 
                        />
                        {t('referFriend.consent1')}
                      </label>
                      <label className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          checked={consent2}
                          onChange={(e) => setConsent2(e.target.checked)}
                          required 
                        />
                        {t('referFriend.consent2')}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!isSubmitEnabled}
                      className={`w-full py-3 font-semibold rounded transition ${
                        isSubmitEnabled
                          ? 'bg-[#0061A7] hover:bg-blue-700 text-white cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {t('referFriend.submit')}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ReferFriendPage;

// --- Helper Components ---
const InputField = ({
  id,
  label,
  type = 'text',
  optional = false,
}: {
  id: string;
  label: string;
  type?: string;
  optional?: boolean;
}) => {
  const t = useTranslations('Refer');
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
        {label} {optional && <span className="text-xs text-gray-500">({t('form.optional')})</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={!optional}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

const TextareaField = ({ id, label, optional }: { id: string; label: string; optional?: boolean }) => {
  const t = useTranslations('Refer');
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
        {label} {optional && <span className="text-xs text-gray-500">({t('form.optional')})</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

const SelectField = ({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) => (
  <div>
    <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
      {label}
    </label>
    <select
      id={id}
      name={id}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      defaultValue=""
    >
      <option value="" disabled>
        -- {label} --
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}) => (
  <div>
    <span className="block text-sm text-[#0061A7] mb-1">{label}</span>
    <div className="flex gap-6">
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center gap-1">
          <input type="radio" name={name} value={opt.value} required />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);