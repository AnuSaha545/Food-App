import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { Heart, Trash2, Clock, Users, ChefHat, Sparkles } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }

    getRecipeDetails();
  }, [id]);

  const isFavorite =
    favoritesList &&
    favoritesList.length > 0 &&
    favoritesList.findIndex(
      (item) => item.id === recipeDetailsData?.recipe?.id
    ) !== -1;

  console.log(recipeDetailsData, "recipeDetailsData");

  if (!recipeDetailsData?.recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  const recipe = recipeDetailsData.recipe;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={recipe?.image_url}
                alt={recipe?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  {recipe?.publisher}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {recipe?.title}
              </h1>

              <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">
                    {recipe?.cooking_time || 45} min
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">
                    {recipe?.servings || 4} servings
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToFavorite(recipe)}
                className={`w-full py-4 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-3 mb-8 ${
                  isFavorite
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
                    : "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                }`}
              >
                {isFavorite ? (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Add to Favorites
                  </>
                )}
              </button>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe?.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span className="flex-1">
                        <span className="font-semibold text-gray-800">
                          {ingredient.quantity
                            ? `${ingredient.quantity} `
                            : ""}
                          {ingredient.unit ? `${ingredient.unit} ` : ""}
                        </span>
                        <span>{ingredient.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}