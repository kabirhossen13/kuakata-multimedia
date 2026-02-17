"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit2, Film, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "Drama",
        releaseYear: new Date().getFullYear(),
        genre: "",
        duration: "",
        synopsis: "",
        trailerUrl: "",
        poster: "",
        featured: false,
        cast: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            cast: formData.cast.split(",").map(c => c.trim()),
            crew: [{ role: "Director", name: "Internal" }] // Default for now
        };

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setModalOpen(false);
                fetchProjects();
                setFormData({ title: "", category: "Drama", releaseYear: 2024, genre: "", duration: "", synopsis: "", trailerUrl: "", poster: "", featured: false, cast: "" });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Manage <span className="italic font-light">Projects</span></h1>
                    <p className="text-zinc-500 mt-2">Archive and publish your cinematic works.</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105"
                >
                    <Plus size={16} /> New Project
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-zinc-950 border border-white/5 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <Search size={18} className="text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="bg-transparent border-none outline-none text-white text-sm w-full font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Poster</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-600 italic">Accessing database...</td></tr>
                            ) : filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <img src={project.poster} className="w-12 h-16 object-cover bg-stone-900 border border-white/10" alt="" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-white">{project.title}</div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{project.genre}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-zinc-800 text-zinc-400 border border-white/5 rounded-sm">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400 font-medium">{project.releaseYear}</td>
                                        <td className="px-6 py-4">
                                            {project.featured ? (
                                                <Check size={18} className="text-primary" />
                                            ) : (
                                                <span className="text-zinc-800">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                                <button
                                                    onClick={() => deleteProject(project._id)}
                                                    className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-600 italic">No matches found in records.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="max-w-4xl w-full bg-zinc-950 border border-white/10 p-10 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Initialize <span className="text-primary">Project Record</span></h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Title</label>
                                    <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</label>
                                    <select className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        <option>Drama</option>
                                        <option>Short Film</option>
                                        <option>Documentary</option>
                                        <option>Web Series</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Release Year</label>
                                    <input type="number" required className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.releaseYear} onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Genre</label>
                                    <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Duration</label>
                                    <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Poster URL</label>
                                    <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.poster} onChange={(e) => setFormData({ ...formData, poster: e.target.value })} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Trailer URL</label>
                                    <input type="text" className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.trailerUrl} onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cast (comma separated)</label>
                                    <input type="text" className="w-full bg-black border border-white/10 p-4 font-medium" value={formData.cast} onChange={(e) => setFormData({ ...formData, cast: e.target.value })} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Synopsis</label>
                                    <textarea rows={4} required className="w-full bg-black border border-white/10 p-4 font-medium resize-none shadow-inner" value={formData.synopsis} onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <input type="checkbox" id="f" className="accent-primary" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                                    <label htmlFor="f" className="text-xs font-bold text-white uppercase tracking-widest cursor-pointer">Mark as Featured Work</label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all">Cancel</button>
                                <button type="submit" className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">Archive Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ProjectsAdmin;
