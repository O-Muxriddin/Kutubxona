import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, Menu, X } from "lucide-react";
import DialogDemoAdd from "./DialogDemoAdd";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [burger, setBurger] = useState(false);
  
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light",
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  };

  return (
    <header
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
      px-4 sm:px-8 h-16 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 font-bold text-lg">
        <BookOpen className="w-6 h-6" />
        Kutubxona
      </div>

      <nav className="hidden sm:flex items-center gap-6 text-sm">
        <Link className="hover:text-blue-500 text-primary" to="/">
          Bosh sahifa
        </Link>
        <Link className="hover:text-blue-500 text-primary" to="/kitoblar">
          Kitoblar
        </Link>
        <Link className="hover:text-blue-500 text-primary" to="/info">
          Yordam
        </Link>
      </nav>

      <div className="hidden sm:flex items-center gap-2">
        <DialogDemoAdd onClick={handleClick} />
        <Button variant="ghost" size="icon" onClick={handleClick}>
          <LogIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? "🌞" : "🌙"}
        </Button>
      </div>

      <div className="sm:hidden flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setBurger(!burger)}>
          {burger ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {burger && (
        <div className="absolute top-16 left-0 w-full bg-background border-t sm:hidden flex flex-col p-4 gap-4 z-10">
          <Link className="hover:text-blue-500 text-primary" to="/">
            Bosh sahifa
          </Link>
          <Link className="hover:text-blue-500 text-primary" to="/kitoblar">
            Kitoblar
          </Link>
          <Link className="hover:text-blue-500 text-primary" to="/info">
            Yordam
          </Link>

          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? "🌞" : "🌙"}
            </Button>
            <DialogDemoAdd onClick={handleClick} />
            <Button variant="ghost" size="icon" onClick={handleClick}>
              <LogIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
