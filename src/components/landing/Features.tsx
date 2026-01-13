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
        <div className="bg-muted/30 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Faster Insights</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Everything you need to understand the music scene
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        We simplify the complex world of music data analytics, giving you the power to make data-driven decisions that matter.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16 group hover:bg-muted/50 p-6 rounded-2xl transition-colors">
                                <dt className="text-base font-semibold leading-7 text-foreground">
                                    <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
