"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit2, Briefcase, X, Save, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const ServicesAdmin = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pricing: "",
        features: "",
        active: true,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
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
            features: formData.features.split(",").map(f => f.trim())
        };

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setModalOpen(false);
                fetchServices();
                setFormData({ title: "", description: "", pricing: "", features: "", active: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Production <span className="italic font-light">Services</span></h1>
                    <p className="text-zinc-500 mt-2">Update your packages and pricing models.</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105"
                >
                    <Plus size={16} /> New Package
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full text-center py-20 text-zinc-600 italic">Calculating rates...</div>
                ) : services.length > 0 ? (
                    services.map((service) => (
                        <div key={service._id} className="bg-zinc-950 border border-white/5 p-8 border-l-4 border-l-primary group">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{service.title}</h3>
                                <div className="flex gap-2 text-zinc-600">
                                    <Edit2 size={16} className="cursor-pointer hover:text-white" />
                                    <Trash2 size={16} className="cursor-pointer hover:text-red-500" />
                                </div>
                            </div>
                            <div className="text-primary font-bold text-lg mb-4">{service.pricing}</div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 italic">"{service.description}"</p>

                            <div className="space-y-2 mb-8">
                                {service.features.map((f: string, i: number) => (
                                    <div key={i} className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {f}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                                {service.active ? (
                                    <span className="flex items-center gap-1 text-green-500"><Eye size={12} /> Active on Site</span>
                                ) : (
                                    <span className="flex items-center gap-1 text-zinc-500"><EyeOff size={12} /> Hidden</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full border border-dashed border-white/10 p-20 text-center">
                        <Briefcase className="mx-auto text-zinc-800 mb-4" size={48} />
                        <p className="text-zinc-600 font-light italic text-lg uppercase tracking-widest">Pricing database empty</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95">
                    <div className="max-w-xl w-full bg-zinc-950 border border-white/10 p-10">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-8">Setup <span className="text-primary">Package</span></h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Package Title</label>
                                <input type="text" required className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-primary" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Pricing Model</label>
                                <input type="text" required placeholder="e.g. Starting from 100k BDT" className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-primary" value={formData.pricing} onChange={(e) => setFormData({ ...formData, pricing: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Core Features (comma separated)</label>
                                <input type="text" required className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-primary" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Brief Description</label>
                                <textarea required className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-primary resize-none" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 bg-zinc-900 font-bold uppercase tracking-widest text-[10px]">Cancel</button>
                                <button type="submit" className="px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all">Create Package</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ServicesAdmin;
