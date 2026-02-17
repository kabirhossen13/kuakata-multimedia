import Hero from "@/components/home/Hero";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedWorks />

      {/* Testimonials Section (Future enhancement) */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-12">Client <span className="italic font-light">Voices</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/5 bg-black/50 backdrop-blur-sm text-left">
              <p className="text-gray-400 italic mb-6">"Their attention to detail and cinematic vision transformed our story into a masterpiece. Highly recommended!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div>
                  <h4 className="text-white font-bold">Rahat Chowdhury</h4>
                  <p className="text-primary text-xs uppercase tracking-tighter">Director, Film Hub</p>
                </div>
              </div>
            </div>
            <div className="p-8 border border-white/5 bg-black/50 backdrop-blur-sm text-left">
              <p className="text-gray-400 italic mb-6">"Professional, punctual, and highly creative. The best production house we have worked with in Dhaka."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div>
                  <h4 className="text-white font-bold">Sumaiya Akhter</h4>
                  <p className="text-primary text-xs uppercase tracking-tighter">Producer, Green Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black border-t border-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Ready to start your <span className="text-primary">next project?</span></h2>
          <Link href="/contact" className="inline-block px-12 py-5 bg-primary text-black font-bold text-lg tracking-widest uppercase hover:bg-white transition-all duration-300">
            Send Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
