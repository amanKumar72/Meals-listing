import { Clock, MapPin, Utensils } from 'lucide-react';
import type { Meal } from '@/types/meal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
      const measure = meal[`strMeasure${i}` as keyof Meal] as string;
      
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  const formatInstructions = (instructions: string) => {
    return instructions.length > 150 
      ? instructions.substring(0, 150) + '...' 
      : instructions;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {meal.strCategory}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{meal.strMeal}</CardTitle>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{meal.strArea}</span>
          </div>
          {meal.strTags && (
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>{meal.strTags.split(',')[0]}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm mb-4 line-clamp-3">
          {formatInstructions(meal.strInstructions)}
        </CardDescription>
        
        <div className="mt-auto">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Key Ingredients:
          </div>
          <div className="flex flex-wrap gap-1">
            {getIngredients().slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {getIngredients().length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{getIngredients().length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        {meal.strYoutube && (
          <div className="mt-4 pt-4 border-t">
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Clock className="h-4 w-4" />
              Watch Recipe
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
