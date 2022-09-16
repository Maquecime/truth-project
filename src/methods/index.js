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
  return ingredients.slice(0,-2);
};
