"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "Drama",
        budgetRange: "",
        timeline: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", projectType: "Drama", budgetRange: "", timeline: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <section className="py-24 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-tighter">Start Your <span className="italic font-light">Journey</span></h1>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-tight">Let's discuss your <span className="text-primary">vision.</span></h2>
                        <p className="text-gray-400 text-lg mb-12">
                            Whether you're looking to produce a full-length drama or a corporate documentary,
                            our team is ready to bring your ideas to life.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Call Us</h4>
                                    <p className="text-gray-400">+880 1234 567890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Email</h4>
                                    <p className="text-gray-400">info@kuakatamultimedia.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <MapPin className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Office</h4>
                                    <p className="text-gray-400">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-zinc-950 border border-white/5">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <MessageSquare className="text-primary" size={20} /> Chat with us on WhatsApp
                            </h4>
                            <a
                                href="https://wa.me/8801234567890"
                                target="_blank"
                                className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                Send WhatsApp Message
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-zinc-950 p-10 border border-white/5 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text" required
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email" required
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Phone Number</label>
                                    <input
                                        type="tel" required
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Project Type</label>
                                    <select
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    >
                                        <option>Drama</option>
                                        <option>Short Film</option>
                                        <option>Documentary</option>
                                        <option>Web Series</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Budget Range</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 50k - 100k BDT"
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.budgetRange}
                                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Timeline</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2 Months"
                                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all"
                                        value={formData.timeline}
                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    rows={4} required
                                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-primary outline-none transition-all resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full py-5 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === "submitting" ? "Sending..." : (
                                    <>Send Message <Send size={16} /></>
                                )}
                            </button>

                            {status === "success" && <p className="text-green-500 text-center font-bold text-xs uppercase tracking-widest">Inquiry sent successfully!</p>}
                            {status === "error" && <p className="text-red-500 text-center font-bold text-xs uppercase tracking-widest">Error sending inquiry. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
