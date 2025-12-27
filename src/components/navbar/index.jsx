import { NavLink } from "react-router-dom";
import { Heart, ChefHat } from "lucide-react";

function Navbar() {
  return (
    <nav className="relative bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 shadow-2xl">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ChefHat className="w-10 h-10 text-amber-300" />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Epicurean
              </h1>
              <p className="text-amber-200 text-xs tracking-widest">
                CULINARY EXCELLENCE
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-orange-900 shadow-lg scale-105"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              <ChefHat className="w-5 h-5" />
              Home
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-orange-900 shadow-lg scale-105"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              <Heart className="w-5 h-5" />
              Favorites
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;