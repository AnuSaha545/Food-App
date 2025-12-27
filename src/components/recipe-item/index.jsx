import { Link } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function RecipeItem({ item }) {
  const { handleAddToFavorite, favoritesList } = useContext(GlobalContext);

  const isFavorite =
    favoritesList.findIndex((favItem) => favItem.id === item.id) !== -1;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Favorite Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToFavorite(item);
          }}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 text-white shadow-lg scale-110"
              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={item?.image_url}
          alt={item?.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
            {item?.publisher}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem]">
          {item?.title}
        </h3>

        <Link
          to={`/recipe-item/${item?.id}`}
          className="block w-full text-center bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold uppercase tracking-wider hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}