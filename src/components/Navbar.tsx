"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Team", href: "/team" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-primary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-primary font-bold text-2xl tracking-tighter">
                            KUAKATA <span className="text-white">MULTIMEDIA</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/admin/login"
                                className="bg-primary text-black px-4 py-2 rounded-sm text-sm font-bold hover:bg-primary-dark transition-colors"
                            >
                                ADMIN
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn("md:hidden bg-black border-b border-primary/20", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/admin/login"
                        className="w-full text-center bg-primary text-black block px-3 py-2 rounded-sm text-base font-bold"
                        onClick={() => setIsOpen(false)}
                    >
                        ADMIN
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
