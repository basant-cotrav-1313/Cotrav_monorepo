import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Cotrav_Logo.png";


interface NavbarProps {}

interface DropdownItem {
  label: string;
  href?: string;
  subItems?: DropdownItem[];
}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  // Services dropdown items
  const servicesItems: DropdownItem[] = [
    { label: "Hotel Booking", href: "#" },
    { label: "Cabs", href: "#" },
    { label: "Ticketing - Train, Bus & Flight", href: "#" },
    { label: "Logistics", href: "#" },
    { label: "FRRO/FRO Consultancy", href: "#" },
  ];

  // Navigation items
  const navItems = [
    { label: "Home", href: "/", isLink: true },
    {
      label: "Services",
      href: "#",
      isLink: false,
      dropdownItems: servicesItems
    },
    { label: "About Us", href: "#", isLink: false },
    { label: "Contact Us", href: "#", isLink: false }
  ];

  useEffect(() => {
    const isSearchHotelPage = location.pathname === "/SearchHotel";
    
    const handleScroll = () => {
      if (isSearchHotelPage) {
        setIsScrolled(window.scrollY > 0);
      }
    };

    setIsScrolled(isSearchHotelPage ? window.scrollY > 0 : false);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Header */}
      <header className={`w-full transition-all duration-300 ${
        isHomePage ? "absolute top-0 left-0 right-0 z-30" : ""
      } ${
        isScrolled ? "opacity-0 invisible h-0" : "opacity-100 visible h-auto"
      }`}>
        <div className={`${isHomePage ? "max-w-none px-0 py-0" : "max-w-7xl mx-auto px-4 md:px-6 py-1.5"}`}>
          <div
            className={`flex items-center justify-between ${
              isHomePage
                ? "px-4 md:px-8 py-3 border-b border-white/35 bg-black/15 backdrop-blur-[2px]"
                : "rounded-xl border border-slate-200 bg-white px-3 md:px-4 py-1.5 shadow-sm"
            }`}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => sessionStorage.clear()}>
                <div className={isHomePage ? "" : "rounded-lg bg-[#0B0E2D] px-2.5 py-1.5"}>
                  <img
                    src={logo}
                    alt="CoTrav Logo"
                    className="h-7 md:h-8 w-auto"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.isLink ? (
                    <Link
                      to={item.href || "#"}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isHomePage
                          ? "text-white hover:text-white hover:bg-white/10"
                          : "text-slate-700 hover:text-[#0B5CAD] hover:bg-blue-50"
                      }`}
                      onClick={item.label === "Home" ? () => sessionStorage.clear() : undefined}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                          isHomePage
                            ? "text-white hover:text-white hover:bg-white/10"
                            : "text-slate-700 hover:text-[#0B5CAD] hover:bg-blue-50"
                        }`}
                      >
                        {item.label}
                        {item.dropdownItems && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Dropdown Menu */}
                      {item.dropdownItems && (
                        <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="py-2">
                            {item.dropdownItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-[#0B5CAD] transition-colors duration-150"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden focus:outline-none ${
                isHomePage ? "text-white hover:text-slate-100" : "text-slate-700 hover:text-[#0B5CAD]"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="rounded-lg bg-[#0B0E2D] px-2 py-1.5">
                <img
                  src={logo}
                  alt="CoTrav Logo"
                  className="h-7 w-auto"
                />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.isLink ? (
                    <Link
                      to={item.href || "#"}
                      className="block py-2 text-sm text-slate-700 hover:text-[#0B5CAD] font-medium"
                      onClick={() => {
                        if (item.label === "Home") sessionStorage.clear();
                        toggleMobileMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <div className="py-2 text-sm text-gray-700 font-medium">
                        {item.label}
                      </div>
                      {item.dropdownItems && (
                        <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                          {item.dropdownItems.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block py-1 text-slate-600 hover:text-[#0B5CAD] text-sm"
                              onClick={toggleMobileMenu}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
