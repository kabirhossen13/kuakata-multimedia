import Link from "next/link";

const FeaturedWorks = () => {
    // Placeholder data for design
    const featuredProjects = [
        {
            id: "1",
            title: "The Silent Echo",
            category: "Short Film",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
            slug: "silent-echo"
        },
        {
            id: "2",
            title: "City of Shadows",
            category: "Drama",
            poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
            slug: "city-of-shadows"
        },
        {
            id: "3",
            title: "Nature's Pulse",
            category: "Documentary",
            poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
            slug: "natures-pulse"
        }
    ];

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Featured <span className="italic font-light">Works</span></h2>
                    </div>
                    <Link href="/portfolio" className="text-primary hover:text-white transition-colors text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                        View All Projects <span className="text-xl">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/portfolio/${project.slug}`}
                            className="group relative overflow-hidden aspect-[3/4] bg-stone-900 border border-white/5"
                        >
                            <img
                                src={project.poster}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWorks;
