import Link from "next/link";
import { Play } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Video Placeholder / Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
                <div className="inline-block px-4 py-1 mb-6 border border-primary/30 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-widest uppercase">
                    Production Excellence
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                    Stories That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Resonate</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                    Kuakata Multimedia is a premier production house in Bangladesh specializing in Bangla Drama,
                    Documentaries, and Short Films.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/portfolio"
                        className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-sm tracking-widest uppercase hover:bg-white transition-all duration-300"
                    >
                        Explore Portfolio
                    </Link>
                    <button
                        className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 font-bold text-sm tracking-widest uppercase hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Play size={16} fill="white" /> Watch Showreel
                    </button>
                </div>
            </div>

            {/* Stats Overlay Bottom */}
            <div className="absolute bottom-0 left-0 right-0 py-12 bg-gradient-to-t from-black to-transparent">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Projects completed", value: "150+" },
                        { label: "Team Members", value: "25+" },
                        { label: "Years Experience", value: "10+" },
                        { label: "Awards Won", value: "12" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-primary text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
