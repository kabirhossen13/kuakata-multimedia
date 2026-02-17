import { Eye, Target, History, Users, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Kuakata Multimedia",
    description: "Learn about the history, vision, and the cinematic excellence of Kuakata Multimedia production company.",
};

const About = () => {
    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <section className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Story</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-tighter">Cinematic <span className="italic font-light">Legacy</span></h1>
                </div>
            </section>

            {/* History & Bio */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="aspect-square bg-stone-900 border border-primary/20 relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1542204172-3c138f67e2a7?q=80&w=1974&auto=format&fit=crop"
                            alt="Director"
                            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <h3 className="text-2xl font-bold text-white">The Visionary</h3>
                            <p className="text-primary text-sm uppercase tracking-widest">Lead Director & Founder</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">Kuakata Multimedia was born from a passion for <span className="text-primary">storytelling.</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Founded over a decade ago, Kuakata Multimedia has evolved into one of Bangladesh's
                            most respected production houses. We specialize in bringing authentic stories to life,
                            focusing on the nuances of Bengali culture while maintaining international production standards.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <History className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Company History</h4>
                                    <p className="text-gray-500 text-sm">Starting as a small team of enthusiasts, we have now produced over 150 projects across multiple genres.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <Award className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Achievements</h4>
                                    <p className="text-gray-500 text-sm">Awarded Best Independent Production House twice, with several short films screened at international festivals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="p-12 border border-white/5 bg-black hover:border-primary/30 transition-all">
                        <Eye className="text-primary mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-4 uppercase">Our Vision</h3>
                        <p className="text-gray-400">To be the leading catalyst for high-quality Bangla content that resonates with audiences globally, bridging the gap between local stories and international audiences.</p>
                    </div>
                    <div className="p-12 border border-white/5 bg-black hover:border-primary/30 transition-all">
                        <Target className="text-primary mb-6" size={40} />
                        <h3 className="text-2xl font-bold text-white mb-4 uppercase">Our Mission</h3>
                        <p className="text-gray-400">To produce thought-provoking and visually stunning content through innovation, dedication, and a relentless pursuit of cinematic excellence in every frame.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
