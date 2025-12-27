import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
import { Search, ChefHat } from "lucide-react";

export default function Home() {
  const { recipeList, loading, searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Discover Culinary Masterpieces
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore thousands of exquisite recipes from around the world
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              placeholder="Search for recipes... (e.g., pasta, chicken, cake)"
              className="w-full px-8 py-6 rounded-full text-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none shadow-lg bg-white"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-600 mb-4"></div>
            <p className="text-2xl font-semibold text-gray-700">
              Discovering amazing recipes...
            </p>
          </div>
        ) : recipeList && recipeList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipeList.map((item) => (
              <RecipeItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-3xl font-bold text-gray-700 mb-4">
              Start Your Culinary Journey
            </p>
            <p className="text-xl text-gray-500">
              Search for your favorite dishes and discover new recipes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}