"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Filter, Play, ExternalLink } from "lucide-react";

const categories = ["All", "Drama", "Short Film", "Documentary", "Web Series", "Commercial"];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const url = activeCategory === "All"
                    ? "/api/projects"
                    : `/api/projects?category=${encodeURIComponent(activeCategory)}`;
                const res = await fetch(url);
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [activeCategory]);

    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <section className="py-24 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Curated Collection</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-tighter">Our <span className="italic font-light">Portfolio</span></h1>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${activeCategory === cat
                                    ? "bg-primary border-primary text-black"
                                    : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-stone-900 animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Link
                                key={project._id}
                                href={`/portfolio/${project._id}`}
                                className="group relative overflow-hidden aspect-[3/4] bg-stone-900 border border-white/5"
                            >
                                <img
                                    src={project.poster}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/0 group-hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-8 h-[1px] bg-primary" />
                                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">{project.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{project.releaseYear} • {project.genre}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center">
                        <h3 className="text-white text-2xl font-light italic">No projects found in this category.</h3>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Portfolio;
