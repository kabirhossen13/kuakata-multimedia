import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black border-t border-primary/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-primary font-bold text-2xl tracking-tighter">
                            KUAKATA <span className="text-white">MULTIMEDIA</span>
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-sm">
                            Professional Bangla Drama, Short Film and Documentary production company.
                            Bringing cinematic excellence to every story we tell.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-primary text-sm transition-colors">Portfolio</Link></li>
                            <li><Link href="/team" className="text-gray-400 hover:text-primary text-sm transition-colors">Our Team</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-primary text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="text-primary mr-3 shrink-0" size={18} />
                                <span className="text-gray-400 text-sm">Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-primary mr-3 shrink-0" size={18} />
                                <span className="text-gray-400 text-sm">+880 1234 567890</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-primary mr-3 shrink-0" size={18} />
                                <span className="text-gray-400 text-sm">info@kuakatamultimedia.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/5 pt-8 text-center text-gray-500 text-xs">
                    <p>© {new Date().getFullYear()} Kuakata Multimedia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
