import { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

const fields = [
  'yourName',
  'yourEmail',
  'friendName',
  'friendEmail',
  'friendPhone',
  'friendOccupation',
  'locations',
] as const;

type FieldKey = typeof fields[number];

const ReferFriendPage: NextPage = () => {
  const t = useTranslations('');

  // Pull translated terms from JSON
  // const rules = Array.from({ length: 7 }, (_, i) => t(`rule${i + 1}`));

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>

      <main className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Logo & Site Name */}
          {/* <div className="flex items-center mb-4">
            <Image
              src="/images/Heart.png"
              alt={t('siteName')}
              width={64}
              height={64}
              className="mr-2"
            />
            <h1 className="text-[#0061A7] text-3xl font-bold">
              {t('siteName')}
            </h1>
          </div> */}

          {/* Form Title & Instructions */}
          {/* <h2 className="text-[#0061A7] text-2xl font-semibold mb-6">
            {t('formTitle')}
          </h2> */}
          <p className="text-[#0061A7] mb-8">
            {t('instructions')}{' '}
            {/* <a href={`mailto:${t('referralEmail')}`} className="underline">
              {t('referralEmail')}
            </a> */}
          </p>

          {/* Registration Form */}
          <form className="space-y-4">
            {fields.map((field: FieldKey) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm text-[#0061A7] mb-1"
                >
                  {t(`fields.${field}`)}:
                </label>
                <input
                  id={field}
                  name={field}
                  type={
                    field.includes('Email')
                      ? 'email'
                      : field.includes('Phone')
                        ? 'tel'
                        : 'text'
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="otherInfo"
                className="block text-sm text-[#0061A7] mb-1"
              >
                {t('otherInfo')}:
              </label>
              <textarea
                id="otherInfo"
                name="otherInfo"
                rows={3}
                className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0061A7]"
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-[#0061A7] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[#0061A7]">
                {t('termsText')}{' '}
                <a href="#terms-section" className="underline">
                  {t('termsLink')}
                </a>
              </label>
            </div>

            <p className="text-xs text-gray-600 underline mt-2">
              {t('consentNote')}
            </p>

            <button
              type="submit"
              className="mt-6 w-full py-2 text-white font-medium rounded bg-[#0061A7] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0061A7]"
            >
              {t('submit')}
            </button>
          </form>

          {/* Terms & Conditions Section */}
          {/* <div
            id="terms-section"
            className="mt-10 border-t pt-4 text-xs text-gray-600 space-y-2"
          >
            <p className="font-bold text-gray-800">{t('termsHeader')}</p>
            {rules.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
            <p className="font-semibold">{t('taxHeader')}</p>
            <p>{t('taxNote')}</p>
          </div> */}

          {/* Office Use Section */}
          {/* <div className="mt-8 flex justify-between items-center text-sm">
            <span>{t('officeUse')}</span>
            <div className="space-x-12">
              <span>
                {t('dateReceived')}{' '}
                <span className="inline-block w-24 border-b border-gray-400"></span>
              </span>
              <span>
                {t('initials')}{' '}
                <span className="inline-block w-16 border-b border-gray-400"></span>
              </span>
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};


export default ReferFriendPage;
