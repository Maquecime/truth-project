export const getIngredients = function (dish) {
  let ingredients = "";
  for (let index = 1; index <= 16; index++) {
    let tmpIngredient = dish["strIngredient" + index];
    if (tmpIngredient) {
      ingredients += tmpIngredient + ", ";
    } else {
      break;
    }
  }
  return ingredients.slice(0, -2);
};

export const getCalories = function (ingredients) {
  let calories = 0;
  let recipe = ""
  for (let index = 0; index < ingredients.length; index++) {
    calories = ingredients[index].calories;
    recipe += ingredients[index].name + " (" + Math.round(calories) + "kcal), "
  }
  return recipe.slice(0, -2);
};
