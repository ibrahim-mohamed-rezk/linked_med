// pages/refer-friend.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const ReferFriendPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Refer a Friend - Head Medical</title>
      </Head>
      <div className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Bubble Heart Logo & Text */}
          <div className="flex items-center mb-2 ">
            <Image
              width={1000}
              height={1000}
              src="/images/Heart.png"
              alt="Head Medical Logo"
              className="w-16 h-auto mr-2"
            />
            <span className="text-[#0061A7] text-3xl font-bold">Head Medical</span>
          </div>
          <h1 className="text-[#0061A7] text-2xl font-semibold mb-6">
            Refer a Friend Registration Form
          </h1>
          {/* Instructions */}
          <p className="text-[#0061A7]  mb-8">
            Simply enter your details and your friend’s details in the form, return it to{' '}
            <a href="mailto:referrals@headmedical.com" className="text-[#0061A7] underline">
              referrals@headmedical.com
            </a>
          </p>

          {/* Form */}
          <form className="space-y-4">
            {[
              { label: 'Your name', id: 'yourName', type: 'text' },
              { label: 'Your email', id: 'yourEmail', type: 'email' },
              { label: "Friend’s name", id: 'friendName', type: 'text' },
              { label: "Friend’s email", id: 'friendEmail', type: 'email' },
              { label: "Friend’s phone number", id: 'friendPhone', type: 'tel' },
              { label: "Friend’s occupation", id: 'friendOccupation', type: 'text' },
              { label: 'Location(s) of interest', id: 'locations', type: 'text' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm text-[#0061A7]  mb-1">
                  {field.label}:
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            {/* Other information textarea */}
            <div>
              <label htmlFor="otherInfo" className="block text-sm text-[#0061A7]  mb-1">
                Other information:
              </label>
              <textarea
                id="otherInfo"
                name="otherInfo"
                rows={3}
                className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0061A7]"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-[#0061A7] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[#0061A7] ">
                I have read and accept the{' '}
                <a href="#terms-section" className="text-[#0061A7] underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Consent note */}
            <p className="text-xs text-gray-600 underline mt-2">
              Please ensure the above named person has agreed to you sharing their details with Head Medical for the purpose of contacting them regarding recruitment.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full py-2 text-white font-medium rounded bg-[#0061A7] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0061A7]"
            >
              Submit
            </button>
          </form>

          {/* Terms & Conditions Section */}
          <div
            id="terms-section"
            className="mt-10 border-t pt-4 text-xs text-gray-600 space-y-2 max-h-64 overflow-y-auto"
          >
            <p className="font-bold text-gray-800">
              Head Medical Referral Rewards Scheme – Terms & Conditions
            </p>
            <p>1. All referrals should be made by completing our Referral Rewards Registration form.</p>
            <p>2. Prospective candidates can only be referred once.</p>
            <p>3. You must be registered with Head Medical to refer a candidate.</p>
            <p>4. The candidate must not have been referred previously.</p>
            <p>5. The candidate must not have already had an interview via Head Medical.</p>
            <p>6. Rewards are paid after the candidate starts their assignment or permanent role.</p>
            <p>7. Head Medical reserves the right to change or cancel the scheme at any time.</p>
            <p className="font-semibold">Tax Implications:</p>
            <p>
              Participation may be subject to taxes; individuals should seek their own advice.
            </p>
          </div>

          {/* Office Use Only */}
          <div className="mt-8 flex justify-between items-center text-sm">
            <span>For Office Use Only</span>
            <div className="space-x-12">
              <span>
                Date Received: <span className="inline-block w-24 border-b border-gray-400"></span>
              </span>
              <span>
                Initials: <span className="inline-block w-16 border-b border-gray-400"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferFriendPage;
