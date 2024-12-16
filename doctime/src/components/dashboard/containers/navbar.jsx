import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Menu items configuration
const items = [
    {
        label: "Home",
        to: "/dashboard",
    },
    {
        label: "Appointments",
        to: "/appointments",
    },
    {
        label: "Remote Check-Up",
        to: "/checkup",
    }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu visibility

    return (
        <div className="w-full">
            <section className="p-4">
                <section className="bg-custombg rounded-2xl">
                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden p-4 flex justify-start">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
                            className="text-white"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" /> // Cross icon for open menu
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger icon for closed menu
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex justify-center items-center h-24">
                        <ul className="flex items-center justify-evenly gap-20 text-white text-2xl">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        className="hover:text-gray-200 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col items-center gap-4 pb-4 text-white text-xl">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        onClick={() => setIsMenuOpen(false)} // Close menu after selection
                                        className="hover:text-gray-200 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Navbar;
