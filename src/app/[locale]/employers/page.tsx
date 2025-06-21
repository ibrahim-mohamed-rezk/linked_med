'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const EmployersPage = () => {
  const t = useTranslations('Employers');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'terms', 'form'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tabs = [
    { id: 'about', label: 'Why partner with us' },
    { id: 'terms', label: 'Terms and conditions' },
    { id: 'form', label: 'Partner with us' }
  ];

  return (
    <>
      <Head>
        <title>{t('employers.pageTitle')}</title>
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0061A7] mb-8 text-center">
            {t('employers.heading')}
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
                  <h2 className="text-2xl font-semibold mb-4">Why partner with us?</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      We connect healthcare employers with top-tier medical professionals who are ready to make 
                      an immediate impact in your organization. Our extensive network spans multiple specialties 
                      and experience levels.
                    </p>
                    <p>
                      Whether you need temporary coverage, permanent placements, or specialized expertise, 
                      we provide qualified healthcare professionals who meet your specific requirements.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0061A7] mb-3">How it works:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">1.</span>
                      Submit your hiring requirements through our partnership form.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">2.</span>
                      We match your needs with qualified professionals from our network.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">3.</span>
                      Interview and select the best candidates for your organization.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">4.</span>
                      We handle onboarding support and ongoing assistance.
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">Quality Assurance</h4>
                    <p className="text-gray-700 text-sm">All professionals are thoroughly vetted, credentialed, and ready to contribute from day one.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">Flexible Solutions</h4>
                    <p className="text-gray-700 text-sm">From short-term assignments to permanent placements, we adapt to your staffing needs.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0061A7] mb-3">Our Services:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <ul className="space-y-2">
                      <li>• Permanent placements</li>
                      <li>• Temporary staffing</li>
                      <li>• Locum tenens</li>
                      <li>• Travel assignments</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Specialty recruitment</li>
                      <li>• Executive search</li>
                      <li>• Credentialing support</li>
                      <li>• Compliance assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">Partnership Terms and Conditions</h2>
                </div>
                <div className="text-sm text-gray-700 space-y-4 whitespace-pre-line">
                  {t('employers.terms')}
                </div>
              </div>
            )}

            {/* Form Tab */}
            {activeTab === 'form' && (
              <div>
                {submitted ? (
                  <div className="text-center text-[#0061A7] space-y-4">
                    <h2 className="text-2xl font-bold">{t('employers.thankYouTitle')}</h2>
                    <p>{t('employers.thankYouMessage')}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2 bg-[#0061A7] text-white rounded hover:bg-blue-700 transition"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-[#0061A7] mb-6 whitespace-pre-line">
                      {t('employers.intro')}
                    </p>

                    {/* Organization Information */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('employers.organizationSection')}
                      </h2>
                      <div className="space-y-4">
                        <InputField id="organizationName" label={t('employers.fields.organizationName')} />
                        <SelectField 
                          id="organizationType" 
                          label={t('employers.fields.organizationType')} 
                          options={['Hospital', 'Clinic', 'Private Practice', 'Healthcare System', 'Long-term Care', 'Other']} 
                        />
                        <InputField id="organizationSize" label={t('employers.fields.organizationSize')} placeholder="e.g., 50-100 employees" />
                        <InputField id="website" label={t('employers.fields.website')} optional placeholder="https://example.com" />
                        <TextareaField id="organizationDescription" label={t('employers.fields.organizationDescription')} optional />
                      </div>
                    </section>

                    {/* Contact Information */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('employers.contactSection')}
                      </h2>
                      <div className="space-y-4">
                        <InputField id="contactName" label={t('employers.fields.contactName')} />
                        <InputField id="contactTitle" label={t('employers.fields.contactTitle')} />
                        <InputField id="contactEmail" label={t('employers.fields.contactEmail')} type="email" />
                        <InputField id="contactPhone" label={t('employers.fields.contactPhone')} />
                        <InputField id="address" label={t('employers.fields.address')} />
                        <div className="grid md:grid-cols-3 gap-4">
                          <InputField id="city" label={t('employers.fields.city')} />
                          <InputField id="state" label={t('employers.fields.state')} />
                          <SelectField 
                            id="country" 
                            label={t('employers.fields.country')} 
                            options={['Germany', 'UAE', 'United States', 'Canada', 'United Kingdom', 'Other']} 
                          />
                        </div>
                      </div>
                    </section>

                    {/* Staffing Needs */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('employers.staffingSection')}
                      </h2>
                      <div className="space-y-4">
                        <SelectField 
                          id="staffingType" 
                          label={t('employers.fields.staffingType')} 
                          options={['Permanent', 'Temporary', 'Locum Tenens', 'Travel', 'Per Diem', 'Multiple Types']} 
                        />
                        <SelectField 
                          id="profession" 
                          label={t('employers.fields.profession')} 
                          options={['Physician', 'Registered Nurse', 'Nurse Practitioner', 'Physician Assistant', 'Pharmacist', 'Therapist', 'Technician', 'Administrative', 'Multiple Professions']} 
                        />
                        <InputField id="specialty" label={t('employers.fields.specialty')} optional placeholder="e.g., Cardiology, Emergency Medicine, ICU" />
                        <SelectField 
                          id="experienceLevel" 
                          label={t('employers.fields.experienceLevel')} 
                          options={['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6+ years)', 'Executive Level', 'Any Experience Level']} 
                        />
                        <InputField id="numberOfPositions" label={t('employers.fields.numberOfPositions')} type="number" />
                        <SelectField 
                          id="urgency" 
                          label={t('employers.fields.urgency')} 
                          options={['Immediate (within 2 weeks)', 'Soon (within 1 month)', 'Moderate (1-3 months)', 'Planning ahead (3+ months)']} 
                        />
                        <TextareaField id="jobDescription" label={t('employers.fields.jobDescription')} />
                        <TextareaField id="requirements" label={t('employers.fields.requirements')} optional />
                      </div>
                    </section>

                    {/* Additional Information */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t('employers.additionalSection')}
                      </h2>
                      <div className="space-y-4">
                        <InputField id="salaryRange" label={t('employers.fields.salaryRange')} optional placeholder="e.g., $80,000 - $120,000 annually" />
                        <TextareaField id="benefits" label={t('employers.fields.benefits')} optional />
                        <RadioGroup
                          name="previousPartnership"
                          label={t('employers.fields.previousPartnership')}
                          options={[
                            { label: t('employers.yes'), value: 'yes' }, 
                            { label: t('employers.no'), value: 'no' }
                          ]}
                        />
                        <TextareaField id="additionalComments" label={t('employers.fields.additionalComments')} optional />
                      </div>
                    </section>

                    {/* Consent */}
                    <div className="space-y-3 text-sm text-[#0061A7]">
                      <label className="flex items-start gap-2">
                        <input type="checkbox" required />
                        {t('employers.consent1')}
                      </label>
                      <label className="flex items-start gap-2">
                        <input type="checkbox" required />
                        {t('employers.consent2')}
                      </label>
                      <label className="flex items-start gap-2">
                        <input type="checkbox" />
                        {t('employers.newsletter')}
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0061A7] hover:bg-blue-700 text-white font-semibold rounded transition"
                    >
                      {t('employers.submit')}
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

export default EmployersPage;

// --- Helper Components ---
const InputField = ({
  id,
  label,
  type = 'text',
  optional = false,
  placeholder = '',
}: {
  id: string;
  label: string;
  type?: string;
  optional?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">({`optional`})</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={!optional}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const TextareaField = ({ 
  id, 
  label, 
  optional = false 
}: { 
  id: string; 
  label: string; 
  optional?: boolean;
}) => (
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
      required
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      defaultValue=""
    >
      <option value="" disabled>
        -- Select {label} --
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