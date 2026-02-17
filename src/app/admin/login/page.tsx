"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link href="/" className="text-primary font-bold text-3xl tracking-tighter mb-4 inline-block">
                        KUAKATA <span className="text-white">ADMIN</span>
                    </Link>
                    <p className="text-zinc-500 text-sm uppercase tracking-widest">Secure Control Panel Access</p>
                </div>

                <div className="bg-zinc-950 p-8 border border-white/5 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    type="email" required
                                    className="w-full bg-black border border-white/10 p-4 pl-12 text-white focus:border-primary outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    type="password" required
                                    className="w-full bg-black border border-white/10 p-4 pl-12 text-white focus:border-primary outline-none transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Authorize Access"}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-zinc-600 hover:text-white text-xs uppercase tracking-widest transition-colors font-bold">
                        ← Return to Public Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
