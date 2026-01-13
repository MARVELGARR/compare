"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Hero() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 bg-background overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Gradient */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-2xl text-center py-20 sm:py-32 lg:py-48">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-ring/10 hover:ring-ring/20">
                        Announcing our new comparison algorithm.{" "}
                        <Link href="#" className="font-semibold text-primary">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Compare Artists like never before.
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Gain deep insights into artist performance, popularity trends, and audience engagement across global markets.
                    The ultimate tool for music industry professionals.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/application">
                        <Button size="lg" className="rounded-full text-base h-12 px-8">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/application/compare" className="text-sm font-semibold leading-6 text-foreground">
                        View Demo <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>

            {/* Feature Snippet Visual */}
            <div className="mx-auto max-w-5xl mt-8 sm:mt-16 opacity-90 hover:opacity-100 transition-opacity duration-500">
                <div className="rounded-xl border bg-card text-card-foreground shadow-2xl overflow-hidden">
                    <div className="p-2 border-b bg-muted/50 flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Mock Card 1 */}
                        <div className="rounded-lg border bg-background p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Users className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold">2.4M</div>
                            <div className="text-xs text-muted-foreground">Monthly Listeners</div>
                            <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[70%]"></div>
                            </div>
                        </div>

                        {/* Mock Card 2 */}
                        <div className="rounded-lg border bg-background p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <Zap className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold text-green-500">+12%</div>
                            <div className="text-xs text-muted-foreground">Growth Rate</div>
                            <div className="mt-auto flex items-end gap-1 h-8">
                                <div className="w-2 bg-green-500/20 h-[40%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500/40 h-[60%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500/60 h-[50%] rounded-t-sm"></div>
                                <div className="w-2 bg-green-500 h-[80%] rounded-t-sm"></div>
                            </div>
                        </div>

                        {/* Mock Card 3 */}
                        <div className="rounded-lg border bg-background p-4 flex flex-col gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold">#14</div>
                            <div className="text-xs text-muted-foreground">Global Rank</div>
                            <div className="flex -space-x-2 mt-2">
                                <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-background"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-background"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-500 border-2 border-background"></div>
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
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
        </div>
    );
}
