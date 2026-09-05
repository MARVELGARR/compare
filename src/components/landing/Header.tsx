"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/src/components/ui/sheet";

const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
];

export default function Header() {
    return (
        <header className="fixed top-0 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-zinc-950/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <span className="text-black text-sm font-bold">CI</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-white">Compare.Insights</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-zinc-400 hover:text-white">Log in</Button>
                    </Link>
                    <Link href="/application">
                        <Button className="bg-white text-black hover:bg-gray-100">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0 text-white">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-zinc-900 border-zinc-800">
                            <div className="flex flex-col gap-6 mt-6">
                                <Link href="/" className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        <span className="text-black text-sm font-bold">CI</span>
                                    </div>
                                    <span className="font-bold text-xl tracking-tight text-white">Compare.Insights</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-2 mt-4">
                                    <SheetClose asChild>
                                        <Link href="/login">
                                            <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">Log in</Button>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="/application">
                                            <Button className="w-full bg-white text-black hover:bg-gray-100">Get Started</Button>
                                        </Link>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
