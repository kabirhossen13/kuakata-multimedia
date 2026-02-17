"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const Services = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/services");
                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <section className="py-24 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Expertise</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-tighter">Production <span className="italic font-light">Packages</span></h1>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">From concept to screen, we provide end-to-end production services tailored to your needs.</p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 bg-stone-900 animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="group p-8 bg-zinc-950 border border-white/5 hover:border-primary/40 transition-all flex flex-col"
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <div className="text-primary font-bold text-xl">{service.pricing}</div>
                                </div>

                                <p className="text-gray-400 text-sm mb-8 line-clamp-3 italic">"{service.description}"</p>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {service.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="text-primary shrink-0" size={16} />
                                            <span className="text-gray-300 text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    className="w-full py-4 text-center border border-white/10 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                                >
                                    Book Production <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Static fallback if no dynamic data yet */}
                        {["Drama Production", "Short Film", "Documentary"].map((title) => (
                            <div key={title} className="p-8 bg-zinc-950 border border-white/5 opacity-50">
                                <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
                                <p className="text-gray-500 mt-4 text-sm font-light italic">Waiting for dynamic packages...</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Services;
