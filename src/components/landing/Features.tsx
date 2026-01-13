"use client";

import { BarChart3, Globe, Layers, ShieldCheck } from "lucide-react";

const features = [
    {
        name: 'Unified Artist Data',
        description:
            'Access data from Spotify, Apple Music, and social platforms in one centralized dashboard. No more tab switching.',
        icon: Layers,
    },
    {
        name: 'Global Market Analytics',
        description:
            'Analyze artist performance across different regions including Nigeria, USA, UK, Ghana, and South Africa.',
        icon: Globe,
    },
    {
        name: 'Real-time Comparison',
        description:
            'Compare artists side-by-side on metrics like followers, popularity trends, and engagement rates instantly.',
        icon: BarChart3,
    },
    {
        name: 'Secure & Reliable',
        description:
            'Built with industry-standard security and high-availability infrastructure to ensure you always have access to your data.',
        icon: ShieldCheck,
    },
]

export default function Features() {
    return (
        <div className="bg-zinc-900 py-16 sm:py-24 lg:py-32" id="features">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-white">Faster Insights</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Everything you need to understand the music scene
                    </p>
                    <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-400 max-w-2xl mx-auto">
                        We simplify the complex world of music data analytics, giving you the power to make data-driven decisions that matter.
                    </p>
                </div>
                <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl sm:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16 group hover:bg-zinc-800/50 p-4 sm:p-6 rounded-2xl transition-colors">
                                <dt className="text-base font-semibold leading-7 text-white">
                                    <div className="absolute left-4 sm:left-6 top-4 sm:top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-zinc-400">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
