"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users } from "lucide-react";

const Team = () => {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch("/api/team");
                const data = await res.json();
                setTeam(data);
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/20 text-green-500 border-green-500/30";
            case "On Project": return "bg-primary/20 text-primary border-primary/30";
            case "Inactive": return "bg-zinc-800 text-zinc-500 border-zinc-700";
            default: return "bg-zinc-800 text-zinc-500 border-zinc-700";
        }
    };

    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <section className="py-24 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Personnel</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-tighter">The <span className="italic font-light">Creators</span></h1>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[4/5] bg-stone-900 animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : team.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <Link
                                key={member._id}
                                href={`/team/${member._id}`}
                                className="group relative bg-zinc-950 border border-white/5 overflow-hidden transition-all hover:border-primary/20"
                            >
                                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{member.name}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 border rounded-full font-bold uppercase tracking-widest ${getStatusColor(member.status)}`}>
                                            {member.status}
                                        </span>
                                    </div>
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                                    <div className="flex items-center text-zinc-500 text-xs gap-2">
                                        <span className="w-4 h-[1px] bg-zinc-700" />
                                        {member.experienceYears} Years Experience
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40">
                        <Users className="mx-auto text-zinc-800 mb-6" size={64} />
                        <h3 className="text-white text-2xl font-light italic">No team members found.</h3>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Team;
