"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Film, Users, MessageSquare, Briefcase, PlusCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        projects: 0,
        team: 0,
        inquiries: 0,
        services: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [p, t, i, s] = await Promise.all([
                    fetch("/api/projects").then(r => r.json()),
                    fetch("/api/team").then(r => r.json()),
                    fetch("/api/inquiries").then(r => r.json()),
                    fetch("/api/services").then(r => r.json()),
                ]);
                setStats({
                    projects: p.length || 0,
                    team: t.length || 0,
                    inquiries: i.length || 0,
                    services: s.length || 0,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Projects", value: stats.projects, icon: Film, color: "text-blue-500", href: "/admin/projects" },
        { label: "Team Members", value: stats.team, icon: Users, color: "text-green-500", href: "/admin/team" },
        { label: "Client Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-primary", href: "/admin/inquiries" },
        { label: "Active Services", value: stats.services, icon: Briefcase, color: "text-orange-500", href: "/admin/services" },
    ];

    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Terminal <span className="italic font-light">Overview</span></h1>
                <p className="text-zinc-500 mt-2">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-zinc-950 border border-white/5 p-8 group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 bg-white/5 border border-white/10 group-hover:border-primary/20`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <Link href={stat.href} className="text-zinc-600 hover:text-white transition-colors">
                                <ExternalLink size={16} />
                            </Link>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{loading ? "..." : stat.value}</div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-zinc-950 border border-white/5 p-8">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">System Health</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 uppercase font-bold tracking-widest">Database Connection</span>
                            <span className="text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 uppercase font-bold tracking-widest">Firebase Auth Service</span>
                            <span className="text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Connected
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 uppercase font-bold tracking-widest">Image Storage (API)</span>
                            <span className="text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-8 flex flex-col justify-center">
                    <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                        <Link href="/admin/projects" className="flex items-center gap-3 w-full p-4 bg-black border border-primary/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
                            <PlusCircle size={16} /> Add New Project
                        </Link>
                        <Link href="/admin/team" className="flex items-center gap-3 w-full p-4 bg-black border border-primary/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
                            <Users size={16} /> Manage Team
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardOverview;
