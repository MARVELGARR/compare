"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import ScrollIndicator from "@/src/components/ui/scroll-indicator";

export default function Hero() {
    return (
        <div className="relative isolate px-6 pt-20 lg:px-8 bg-zinc-950 overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Gradient */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-3xl text-center py-12 sm:py-20 lg:py-32">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-zinc-400 ring-1 ring-zinc-800 hover:ring-zinc-700 bg-zinc-900/50 transition-all">
                        Announcing our new comparison algorithm.{" "}
                        <Link href="#" className="font-semibold text-white hover:text-zinc-200">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Compare Artists like never before.
                </h1>

                <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-400 max-w-2xl mx-auto">
                    Gain deep insights into artist performance, popularity trends, and audience engagement across global markets.
                    The ultimate tool for music industry professionals.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                    <Link href="/application" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-12 px-8 bg-white text-black hover:bg-gray-100">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/application/compare" className="text-sm font-semibold leading-6 text-white hover:text-zinc-300 transition-colors">
                        View Demo <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>

            {/* Feature Snippet Visual */}
            <div className="mx-auto max-w-6xl mt-12 sm:mt-16 lg:mt-20 mb-12 opacity-90 hover:opacity-100 transition-opacity duration-500 px-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-white shadow-2xl overflow-hidden">
                    <div className="p-2 border-b border-zinc-800 bg-zinc-900/50 flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {/* Mock Card 1 */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <Users className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold text-white">2.4M</div>
                            <div className="text-xs text-zinc-400">Monthly Listeners</div>
                            <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[70%]"></div>
                            </div>
                        </div>

                        {/* Mock Card 2 */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <Zap className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold text-green-500">+12%</div>
                            <div className="text-xs text-zinc-400">Growth Rate</div>
                            <div className="mt-auto flex items-end gap-1 h-8">
                                <div className="w-2 bg-green-500/20 h-[40%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500/40 h-[60%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500/60 h-[50%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500 h-[80%] rounded-t-sm"></div>
                            </div>
                        </div>

                        {/* Mock Card 3 */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold text-white">#14</div>
                            <div className="text-xs text-zinc-400">Global Rank</div>
                            <div className="flex -space-x-2 mt-2">
                                <div className="h-6 w-6 rounded-full bg-zinc-700 border-2 border-zinc-950"></div>
                                <div className="h-6 w-6 rounded-full bg-zinc-600 border-2 border-zinc-950"></div>
                                <div className="h-6 w-6 rounded-full bg-zinc-500 border-2 border-zinc-950"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <ScrollIndicator targetId="features" />
        </div>
    );
}
