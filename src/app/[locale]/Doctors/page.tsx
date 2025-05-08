import Image from 'next/image';
import React from 'react';
import { getTranslations } from 'next-intl/server';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    image: string;
    profileLink: string;
}

const doctors: Doctor[] = [
    {
        id: 1,
        name: 'Dr. Emily Carter',
        specialization: 'Cardiologist',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        profileLink: 'https://www.exampleclinic.com/dr-emily-carter',
    },
    {
        id: 2,
        name: 'Dr. Michael Brown',
        specialization: 'Dermatologist',
        image: 'https://randomuser.me/api/portraits/men/34.jpg',
        profileLink: 'https://www.exampleclinic.com/dr-michael-brown',
    },
    {
        id: 3,
        name: 'Dr. Sophia Martinez',
        specialization: 'Pediatrician',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        profileLink: 'https://www.exampleclinic.com/dr-sophia-martinez',
    },
    {
        id: 4,
        name: 'Dr. James Wilson',
        specialization: 'Orthopedic Surgeon',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        profileLink: 'https://www.exampleclinic.com/dr-james-wilson',
    },
];

// Server component to support next-intl
export default async function DoctorsPage() {
    const t = await getTranslations('');

    return (
        <main className="min-h-screen bg-gray-100 p-4 md:p-8 lg:p-12">
            <h1 className="text-center font-bold mb-8 text-[clamp(1.5rem,5vw,2.5rem)]">
                {t('title')}
            </h1>
            <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {doctors.map((doc) => (
                    <div
                        key={doc.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                    >
                        <div className="relative w-full h-80">
                            <Image
                                src={doc.image}
                                alt={doc.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h2 className="font-semibold mb-2 text-[clamp(1.125rem,3vw,1.5rem)]">
                                {doc.name}
                            </h2>
                            <p className="text-gray-600 mb-4 text-[clamp(0.875rem,2.5vw,1rem)] flex-1">
                                {doc.specialization}
                            </p>
                            <a
                                href={doc.profileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-block text-center font-medium py-2 px-4 border border-primary rounded-xl hover:bg-primary  transition"
                            >
                                {t('viewProfile')}
                            </a>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}