import Image from 'next/image';
import Link from 'next/link';
import ceoImage from '/public/images/Home/CEO011.png';
import { getTranslations } from 'next-intl/server';

export default async function InspirationPage() {
  const t = await getTranslations('Home');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="lg:w-2/3 space-y-6">
          <p className="text-lg lg:text-xl leading-relaxed">
            {t('journey')}
          </p>
          <p className="text-lg lg:text-xl leading-relaxed">
            {t('connect')}
          </p>
          <p className="text-lg lg:text-xl leading-relaxed">
            {t('roots')}
          </p>
        </div>

        {/* Image + Button */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src={ceoImage}
            alt="CEO or Mentor"
            width={300}
            height={300}
            className="rounded-xl"
            priority
          />
          <Link href="/start">
            <div className="px-19 py-3 border-2 text-xl border-white rounded-3xl rounded-br-none rounded-tl-none text-white hover:bg-white hover:text-black transition text-center cursor-pointer">
              {t('button')}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
