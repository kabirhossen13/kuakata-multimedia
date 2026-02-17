"use client";

import { useState, useEffect, use } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Briefcase, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

const TeamMemberDetail = ({ params }: PageProps) => {
    const { id } = use(params);
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const teamRes = await fetch("/api/team");
                const teamData = await teamRes.json();
                const found = teamData.find((m: any) => m._id === id);
                setMember(found);
            } catch (error) {
                console.error("Error fetching member:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchMember();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    if (!member) return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h2 className="text-2xl mb-4">Member not found</h2><Link href="/team" className="text-primary uppercase tracking-widest font-bold">Back to Team</Link></div>;

    return (
        <div className="bg-black min-h-screen pb-24">
            {/* Profile Header */}
            <section className="py-24 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <Link href="/team" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                        <ArrowLeft size={14} /> Back to Team
                    </Link>

                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="w-full md:w-80 aspect-[4/5] bg-stone-900 relative overflow-hidden shrink-0 border border-primary/20">
                            <img src={member.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={member.name} />
                        </div>

                        <div className="flex-grow">
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Professional Profile</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 uppercase tracking-tighter">{member.name}</h1>
                            <p className="text-2xl text-zinc-500 font-light italic mb-8">{member.role}</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                                <div>
                                    <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Experience</div>
                                    <div className="text-white font-bold">{member.experienceYears} Years</div>
                                </div>
                                <div>
                                    <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Status</div>
                                    <div className="text-primary font-bold">{member.status}</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {member.socialLinks?.facebook && <a href={member.socialLinks.facebook} className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"><Facebook size={18} /></a>}
                                {member.socialLinks?.instagram && <a href={member.socialLinks.instagram} className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"><Instagram size={18} /></a>}
                                {member.socialLinks?.linkedin && <a href={member.socialLinks.linkedin} className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"><Linkedin size={18} /></a>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bio & Skills */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-primary" /> Biography
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                            {member.bio}
                        </p>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                                <Star size={16} className="text-primary" /> Skills & Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2 flex items-center gap-2">
                                <Briefcase size={16} className="text-primary" /> Key Contributions
                            </h3>
                            <p className="text-zinc-500 text-sm italic">
                                {member.name} has been a core member of Kuakata Multimedia since {new Date().getFullYear() - member.experienceYears},
                                contributing to numerous high-profile productions across Bangladesh.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamMemberDetail;
