"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Film,
    Users,
    Briefcase,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Film },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/admin/login");
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black flex text-white">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-white/5 transition-transform duration-300 lg:static lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="p-8 border-b border-white/5">
                        <Link href="/" className="text-primary font-bold text-xl tracking-tighter uppercase">
                            KUAKATA <span className="text-white">CMS</span>
                        </Link>
                    </div>

                    <nav className="flex-grow p-4 space-y-2 mt-4">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all",
                                        isActive
                                            ? "bg-primary text-black"
                                            : "text-zinc-500 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <link.icon size={18} />
                                    {link.name}
                                    {isActive && <ChevronRight size={14} className="ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col">
                {/* Header */}
                <header className="h-16 bg-zinc-950 border-b border-white/5 flex items-center justify-between px-8">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden text-zinc-500 hover:text-white"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-white uppercase tracking-widest">{user.email}</div>
                            <div className="text-[10px] text-primary uppercase font-bold">Terminal Access Active</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                            {user.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="p-8 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
