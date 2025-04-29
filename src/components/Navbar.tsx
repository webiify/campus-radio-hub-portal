
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/activities", label: "ACTIVITIES" },
    { href: "/events", label: "EVENTS" },
    { href: "/study-material", label: "STUDY MATERIAL" },
    { href: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-club-dark bg-opacity-90 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/public/lovable-uploads/350bd875-709f-4942-ac08-e570f1475978.png"
                alt="Campus TV and Radio Club Logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-lg font-semibold text-white">
                Campus TV & Radio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-club-primary ${
                      location.pathname === link.href
                        ? "text-club-primary"
                        : "text-white"
                    } hover:scale-105 inline-block`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle Button */}
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleTheme} 
              className="ml-2 text-white hover:bg-white/10 hover:text-club-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleTheme} 
              className="mr-2 text-white hover:bg-transparent hover:text-club-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              className="text-white hover:bg-transparent hover:text-club-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-club-dark md:hidden">
          <ul className="space-y-2 px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`block py-2 text-base font-medium transition-colors hover:text-club-primary ${
                    location.pathname === link.href
                      ? "text-club-primary"
                      : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
