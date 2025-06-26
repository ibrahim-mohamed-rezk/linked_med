'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const EmployerRegistrationPage = () => {
  const t = useTranslations('Employer');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'terms', 'form'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tabs = [
    { id: 'about', label: 'Partner with LinkedMed' },
    { id: 'terms', label: 'Terms and Conditions' },
    { id: 'form', label: 'Employer Registration' }
  ];

  return (
    <>
      <Head>
        <title>{t('employer.pageTitle')}</title>
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0061A7] mb-4">
              🔹 Hire Healthcare Talent -- Register as an Employer
            </h1>
            <p className="text-lg text-gray-600">
              Your Trusted Medical Recruitment Ally
            </p>
          </div>

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
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-[#0061A7] mb-4">
                    🩺 Partner with LinkedMed
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    At LinkedMed, we understand that staffing your healthcare facility with 
                    the right professionals is not just a task — it&apos;s a mission.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0061A7] mb-4">Our Expertise</h3>
                  <p className="text-gray-700 mb-4">
                    With over four years of experience connecting clinics, hospitals, and 
                    care institutions across Europe and the Middle East with highly qualified 
                    doctors, nurses, and pharmacists, we specialize in:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0061A7] rounded-full"></span>
                      <strong>Clinical precision</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0061A7] rounded-full"></span>
                      <strong>Regulatory compliance</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0061A7] rounded-full"></span>
                      <strong>Human reliability</strong>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-3">Thoroughly Vetted Professionals</h4>
                    <p className="text-gray-700 text-sm">
                      Every healthcare provider we recommend has been thoroughly vetted, 
                      language-trained, and prepared to meet your institution&apos;s standards — 
                      medically, culturally, and professionally.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-3">Complete Support</h4>
                    <p className="text-gray-700 text-sm">
                      Our team supports you from first contact to final onboarding — 
                      including document handling, visa logistics, and long-term follow-up.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0061A7] text-white p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-3">Whether you&apos;re filling a single post or scaling your workforce</h3>
                  <p className="mb-4">
                    Register your hiring needs below or send us a tailored inquiry.
                  </p>
                  <p className="text-lg font-semibold">
                    We&apos;ll respond within <span className="bg-white text-[#0061A7] px-2 py-1 rounded">48 hours</span> with candidates you can trust!
                  </p>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">LinkedMed — Employer Terms & Conditions of Service</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    By submitting a registration or inquiry to LinkedMed, you (the &quot;Employer&quot;) agree to the following terms:
                  </p>
                </div>
                
                <div className="space-y-6 text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">1. Scope of Service</h3>
                    <p>LinkedMed provides recruitment and facilitation services for the introduction of qualified healthcare professionals (&quot;Candidates&quot;) to healthcare institutions and companies (&quot;Employers&quot;). LinkedMed acts solely as an intermediary and does not employ the candidates directly.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">2. Candidate Relationship & Liability</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• All employment agreements are entered into exclusively between the Employer and the Candidate.</li>
                      <li>• LinkedMed is not liable for any acts, omissions, negligence, misconduct, breach of contract, or other actions taken by the Candidate once employed by the Employer.</li>
                      <li>• The Employer agrees to conduct its own due diligence, including professional interviews, reference checks, and contract negotiations before hiring.</li>
                      <li>• LinkedMed does not guarantee job performance, visa approval, or retention beyond the introduction period.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">3. Compliance with Legal Requirements</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• The Employer acknowledges that it is solely responsible for ensuring legal compliance with all applicable labor, immigration, licensing, and tax laws in its jurisdiction.</li>
                      <li>• LinkedMed provides supporting documentation and administrative assistance only, not legal or immigration representation.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">4. Data Protection (GDPR & International Standards)</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• All personal data shared by LinkedMed or the Candidate must be processed in accordance with GDPR and applicable data protection regulations.</li>
                      <li>• Employers must treat all candidate data as confidential and shall not disclose it to third parties without express written consent.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">5. Indemnification</h3>
                    <p>The Employer agrees to indemnify and hold harmless LinkedMed, its directors, staff, and partners from any claim, liability, loss, or damage arising from:</p>
                    <ul className="space-y-1 ml-4 mt-2">
                      <li>• The use or misuse of LinkedMed&apos;s services</li>
                      <li>• The employment or engagement of a Candidate introduced by LinkedMed</li>
                      <li>• Any claims brought by the Candidate related to employment conditions, visa status, or legal disputes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">6. No Guarantee Clause</h3>
                    <p>While LinkedMed ensures that candidates meet general eligibility requirements and language qualifications, the Employer accepts that outcome-based results (such as visa issuance, contract duration, or relocation success) cannot be guaranteed. Any delays or failures due to government, embassy, or licensing authorities are outside LinkedMed&apos;s control.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">7. Jurisdiction & Governing Law</h3>
                    <p>These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Germany. Disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts in Frankfurt am Main, Germany.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Tab */}
            {activeTab === 'form' && (
              <div>
                {submitted ? (
                  <div className="text-center text-[#0061A7] space-y-6 bg-green-50 p-8 rounded-lg">
                    <div className="text-6xl">✅</div>
                    <h2 className="text-2xl font-bold">Thank you for registering with LinkedMed!</h2>
                    <p className="text-lg">Our recruitment team will contact you within 24-48 hours to discuss your hiring needs.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2 bg-[#0061A7] text-white rounded hover:bg-blue-700 transition"
                    >
                      Submit Another Registration
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-[#0061A7] font-medium">
                        Complete the form below to register as an employer and start connecting with qualified healthcare professionals.
                      </p>
                    </div>

                    {/* Organization Details */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-4">Organization Information</h2>
                      <div className="space-y-4">
                        <InputField id="organizationName" label="Organization / Hospital Name" required />
                        <InputField id="countryCity" label="Country & City" placeholder="e.g., Germany, Frankfurt" required />
                        <SelectField 
                          id="facilityType" 
                          label="Type of Facility" 
                          options={['Hospital', 'Clinic', 'Care Home', 'Private Practice', 'Other']} 
                          required 
                        />
                      </div>
                    </section>

                    {/* Contact Information */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <InputField id="contactName" label="Contact Person Name" required />
                        <InputField id="email" label="Email Address" type="email" required />
                        <InputField id="confirmEmail" label="Confirm Email Address" type="email" required />
                        <InputField id="phoneNumber" label="Phone Number (with country code)" optional />
                      </div>
                    </section>

                    {/* Job Requirements */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-4">Hiring Requirements</h2>
                      <div className="space-y-4">
                        <TextareaField 
                          id="jobTitles" 
                          label="Job Titles or Departments Needed" 
                          placeholder="e.g., ICU Nurse, Pediatrician, Pharmacist" 
                          required 
                        />
                        <InputField id="numberOfPositions" label="Number of Positions" type="number" optional />
                        <InputField 
                          id="languagesRequired" 
                          label="Languages Required" 
                          placeholder="e.g., German B2, Arabic, English" 
                          optional 
                        />
                        <InputField id="startDate" label="Preferred Start Date" type="date" optional />
                        <InputField 
                          id="salaryRange" 
                          label="Expected Salary Range" 
                          placeholder="e.g., €3,500 – €5,000 per month" 
                          optional 
                        />
                      </div>
                    </section>

                    {/* Additional Information */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-4">Additional Information</h2>
                      <div className="space-y-4">
                        <FileUploadField id="jobDescription" label="Upload Job Description" accept=".pdf,.docx" />
                        <TextareaField 
                          id="helpMessage" 
                          label="How can we help you? (Your Message)" 
                          placeholder="Inquiry or special requests" 
                          optional 
                        />
                        <SelectField 
                          id="hearAboutUs" 
                          label="How did you hear about us?" 
                          options={['Website', 'Referral', 'LinkedIn', 'Event', 'Other']} 
                          optional 
                        />
                      </div>
                    </section>

                    {/* Consent */}
                    <div className="space-y-3 text-sm text-[#0061A7] bg-gray-50 p-4 rounded-lg">
                      <label className="flex items-start gap-2">
                        <input type="checkbox" required className="mt-1" />
                        <span>I agree to LinkedMed&apos;s terms and data privacy policy.</span>
                      </label>
                      <label className="flex items-start gap-2">
                        <input type="checkbox" required className="mt-1" />
                        <span>I acknowledge that I have read and understood the Terms & Conditions above.</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0061A7] hover:bg-blue-700 text-white font-semibold rounded transition text-lg"
                    >
                      Submit Inquiry
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

export default EmployerRegistrationPage;

// --- Helper Components ---
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
}

const InputField = ({
  id,
  label,
  type = 'text',
  required = false,
  optional = false,
  placeholder = ''
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">(optional)</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

interface TextareaFieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
}

const TextareaField = ({ 
  id, 
  label, 
  required = false, 
  optional = false, 
  placeholder = '' 
}: TextareaFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">(optional)</span>}
    </label>
    <textarea
      id={id}
      name={id}
      rows={3}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
  optional?: boolean;
}

const SelectField = ({ 
  id, 
  label, 
  options, 
  required = false, 
  optional = false 
}: SelectFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">(optional)</span>}
    </label>
    <select
      id={id}
      name={id}
      required={required}
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

interface FileUploadFieldProps {
  id: string;
  label: string;
  accept?: string;
  optional?: boolean;
}

const FileUploadField = ({ 
  id, 
  label, 
  accept = '', 
  optional = false 
}: FileUploadFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#0061A7] mb-1">
      {label} {optional && <span className="text-xs text-gray-500">(optional)</span>}
    </label>
    <input
      id={id}
      name={id}
      type="file"
      accept={accept}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-[#0061A7] hover:file:bg-blue-100"
    />
    <p className="text-xs text-gray-500 mt-1">Accepts PDF, DOCX files</p>
  </div>
);

