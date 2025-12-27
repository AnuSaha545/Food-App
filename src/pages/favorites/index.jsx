import { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";
import { Heart, Trash2 } from "lucide-react";

export default function Favorites() {
  const { favoritesList, handleAddToFavorite } = useContext(GlobalContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            Your Favorite Recipes
          </h2>
          <p className="text-xl text-gray-600">
            {favoritesList.length}{" "}
            {favoritesList.length === 1 ? "recipe" : "recipes"} saved
          </p>
        </div>

        {/* Recipe Grid */}
        {favoritesList && favoritesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoritesList.map((item) => (
              <div key={item.id} className="relative">
                <RecipeItem item={item} />
                {/* Delete Button Overlay */}
                <button
                  onClick={() => handleAddToFavorite(item)}
                  className="absolute top-6 right-6 z-20 p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-3xl font-bold text-gray-700 mb-4">
              No Favorites Yet
            </p>
            <p className="text-xl text-gray-500">
              Start adding recipes to your favorites collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}