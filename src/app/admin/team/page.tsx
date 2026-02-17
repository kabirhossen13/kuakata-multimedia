"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit2, Users, Search, X, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const TeamAdmin = () => {
    const [team, setTeam] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        experienceYears: 1,
        skills: "",
        status: "Active",
        image: "",
    });

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            setTeam(data);
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
            skills: formData.skills.split(",").map(s => s.trim())
        };

        try {
            const res = await fetch("/api/team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setModalOpen(false);
                fetchTeam();
                setFormData({ name: "", role: "", bio: "", experienceYears: 1, skills: "", status: "Active", image: "" });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTeam = team.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Personnel <span className="italic font-light">Management</span></h1>
                    <p className="text-zinc-500 mt-2">Manage your production team and their availability.</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105"
                >
                    <Plus size={16} /> Add Personnel
                </button>
            </div>

            <div className="bg-zinc-950 border border-white/5 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <Search size={18} className="text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="bg-transparent border-none outline-none text-white text-sm w-full font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-600 italic">Reading dossier...</td></tr>
                            ) : filteredTeam.length > 0 ? (
                                filteredTeam.map((member) => (
                                    <tr key={member._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <img src={member.image} className="w-10 h-10 rounded-full object-cover grayscale" alt="" />
                                        </td>
                                        <td className="px-6 py-4 font-bold text-white text-sm">{member.name}</td>
                                        <td className="px-6 py-4 text-xs font-medium text-zinc-400 uppercase tracking-widest">{member.role}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border rounded-full",
                                                member.status === 'Active' ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-zinc-500 border-zinc-500/30'
                                            )}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 text-zinc-600">
                                                <Edit2 size={16} className="cursor-pointer hover:text-white" />
                                                <Trash2 size={16} className="cursor-pointer hover:text-red-500" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-600 italic">No personnel found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 transition-all">
                    <div className="max-w-2xl w-full bg-zinc-950 border border-white/10 p-10 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Add New <span className="text-primary">Personnel</span></h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Full Name</label>
                                <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Professional Role</label>
                                <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Experience (Years)</label>
                                    <input type="number" required className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.experienceYears} onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Status</label>
                                    <select className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                        <option>Active</option>
                                        <option>On Project</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Image URL</label>
                                <input type="text" required className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Skills (comma separated)</label>
                                <input type="text" className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Full Bio</label>
                                <textarea rows={4} required className="w-full bg-black border border-white/10 p-4 font-medium text-white outline-none focus:border-primary transition-all resize-none shadow-inner" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                            </div>

                            <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 bg-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all">Cancel</button>
                                <button type="submit" className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">Register Personnel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default TeamAdmin;
