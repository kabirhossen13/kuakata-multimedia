"use client";

import { useState, useEffect, use } from "react";
import { Play, Calendar, Clock, Video, Award, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

const ProjectDetailClient = ({ params }: PageProps) => {
    const { id } = use(params);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProject();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    if (!project) return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h2 className="text-2xl mb-4">Project not found</h2><Link href="/portfolio" className="text-primary uppercase tracking-widest font-bold">Back to Portfolio</Link></div>;

    return (
        <div className="bg-black min-h-screen pb-24">
            {/* Hero Header */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <img src={project.poster} className="w-full h-full object-cover opacity-40 blur-sm" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
                        <div className="w-64 aspect-[3/4] bg-stone-900 border border-primary/20 shadow-2xl shrink-0 hidden md:block">
                            <img src={project.poster} className="w-full h-full object-cover" alt={project.title} />
                        </div>
                        <div className="text-center md:text-left">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{project.category}</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">{project.title}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {project.releaseYear}</div>
                                <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {project.duration}</div>
                                <div className="flex items-center gap-2"><Video size={16} className="text-primary" /> {project.genre}</div>
                            </div>
                            <a
                                href={project.trailerUrl}
                                target="_blank"
                                className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:scale-105"
                            >
                                <Play size={18} fill="black" /> Watch Trailer
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Col: Synopsis & Gallery */}
                    <div className="lg:col-span-2 space-y-16">
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-primary" /> Synopsis
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">{project.synopsis}</p>
                        </div>

                        {project.gallery && project.gallery.length > 0 && (
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Production Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {project.gallery.map((img: string, i: number) => (
                                        <div key={i} className="aspect-video bg-zinc-900 overflow-hidden border border-white/5">
                                            <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Col: Cast & Crew */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2">Cast</h3>
                            <div className="space-y-3">
                                {project.cast.map((c: string, i: number) => (
                                    <div key={i} className="text-gray-400 font-medium">{c}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/5 pb-2">Crew</h3>
                            <div className="space-y-4">
                                {project.crew.map((c: any, i: number) => (
                                    <div key={i}>
                                        <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{c.role}</div>
                                        <div className="text-white font-medium">{c.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {project.awards && project.awards.length > 0 && (
                            <div className="p-6 bg-zinc-950 border border-primary/20">
                                <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><Award size={16} /> Awards & Selection</h3>
                                <ul className="space-y-2 text-sm text-gray-400 italic">
                                    {project.awards.map((award: string, i: number) => (
                                        <li key={i}>• {award}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailClient;
