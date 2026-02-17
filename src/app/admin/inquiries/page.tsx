"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { MessageSquare, Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const InquiriesAdmin = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/inquiries");
            const data = await res.json();
            setInquiries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteInquiry = async (id: string) => {
        if (!confirm("Remove this record from the database?")) return;
        try {
            // Endpoint logic assumed for deletion
            await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
            fetchInquiries();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Client <span className="italic font-light">Inquiries</span></h1>
                <p className="text-zinc-500 mt-2">Manage incoming project requests and bookings.</p>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-20 text-zinc-600 italic">Retrieving transmissions...</div>
                ) : inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-zinc-950 border border-white/5 p-8 group hover:border-primary/20 transition-all">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                                            inquiry.status === 'New' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                                        )}>
                                            {inquiry.status}
                                        </span>
                                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                            <Clock size={12} /> {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{inquiry.name}</h3>
                                    <div className="flex flex-wrap gap-6 mb-6">
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                                            <Mail size={14} className="text-primary" /> {inquiry.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                                            <Phone size={14} className="text-primary" /> {inquiry.phone}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-black border border-white/5 mb-6">
                                        <div>
                                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Project Type</div>
                                            <div className="text-white text-sm font-bold uppercase">{inquiry.projectType}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Budget</div>
                                            <div className="text-white text-sm font-bold italic">{inquiry.budgetRange}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Timeline</div>
                                            <div className="text-white text-sm font-bold truncate">{inquiry.timeline}</div>
                                        </div>
                                    </div>

                                    <div className="text-zinc-400 text-sm italic leading-relaxed whitespace-pre-line border-l-2 border-primary/20 pl-6 py-2">
                                        "{inquiry.message}"
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2 shrink-0">
                                    <button className="flex-grow md:flex-grow-0 p-4 bg-zinc-900 border border-white/5 text-zinc-500 hover:text-green-500 hover:border-green-500/30 transition-all flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                                        <CheckCircle size={16} /> Mark Handled
                                    </button>
                                    <button
                                        onClick={() => deleteInquiry(inquiry._id)}
                                        className="flex-grow md:flex-grow-0 p-4 bg-zinc-900 border border-white/5 text-zinc-500 hover:text-red-500 hover:border-red-500/30 transition-all flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest"
                                    >
                                        <Trash2 size={16} /> Archive
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-40 bg-zinc-950 border border-white/5">
                        <MessageSquare className="mx-auto text-zinc-800 mb-6" size={64} />
                        <h3 className="text-white text-2xl font-light italic">No inquiries found in transmission logs.</h3>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default InquiriesAdmin;
