
export async function searchJobs(formData: FormData): Promise<void> {
  const data = {
    discipline: formData.get('discipline'),
    grade: formData.get('grade'),
    country: formData.get('country'),
    area: formData.get('area'),
    speciality: formData.get('speciality'),
    keywords: formData.get('keywords'),
  };

  console.log('[Server Action] Form Submitted:', data);
}
