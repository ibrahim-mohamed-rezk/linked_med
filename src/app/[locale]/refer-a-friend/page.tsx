'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const ReferFriendPage = () => {
  const t = useTranslations('Refer');
  const [submitted, setSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>{t('referFriend.pageTitle')}</title>
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          {!submitted && (
            <>
              <h1 className="text-3xl font-bold text-[#0061A7] mb-4">
                {t('referFriend.heading')}
              </h1>
              <p className="text-[#0061A7] mb-6 whitespace-pre-line">
                {t('referFriend.intro')}
              </p>
            </>
          )}

          {/* Thank You Message */}
          {submitted ? (
            <div className="text-center text-[#0061A7] space-y-4">
              <h2 className="text-2xl font-bold">{t('referFriend.thankYouTitle')}</h2>
              <p>{t('referFriend.thankYouMessage')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <SelectField id="candidateCountry" label={t('referFriend.fields.country')} options={['Germany', 'UAE', 'Other']} />
                  <SelectField id="profession" label={t('referFriend.fields.profession')} options={['Doctor', 'Nurse', 'Pharmacist', 'Other']} />
                  <InputField id="specialty" label={t('referFriend.fields.specialty')} optional />
                  <SelectField id="experience" label={t('referFriend.fields.experience')} options={['0–2 years', '3–5 years', '6+ years']} />
                  <SelectField id="location" label={t('referFriend.fields.location')} options={['Germany', 'UAE', 'Other']} />
                  <SelectField id="language" label={t('referFriend.fields.language')} options={['A1', 'A2', 'B1', 'B2', 'Not Started Yet']} />
                </div>
              </section>

              {/* Consent */}
              <div className="space-y-3 text-sm text-[#0061A7]">
                <label className="flex items-start gap-2">
                  <input type="checkbox" required />
                  {t('referFriend.consent1')}
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" required />
                  {t('referFriend.consent2')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0061A7] hover:bg-blue-700 text-white font-semibold rounded transition"
              >
                {t('referFriend.submit')}
              </button>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-sm text-[#0061A7] underline"
                >
                  {showTerms ? t('referFriend.hideTerms') : t('referFriend.showTerms')}
                </button>
                {showTerms && (
                  <div className="mt-4 text-sm text-gray-700 space-y-2 whitespace-pre-line">
                    {t('referFriend.terms')}
                  </div>
                )}
              </div>
            </form>
          )}
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
}) => (
  <div>
    <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">({`optional`})</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const TextareaField = ({ id, label, optional }: { id: string; label: string; optional?: boolean }) => (
  <div>
    <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">({`optional`})</span>}
    </label>
    <textarea
      id={id}
      name={id}
      rows={3}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

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
      className="w-full px-4 py-2 border border-gray-300 rounded"
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
          <input type="radio" name={name} value={opt.value} />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);
