import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import type { MealsResponse, Meal } from '@/types/meal';
import { MealService } from '@/services/mealService';
import { MealCard } from '@/components/MealCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function MealsList() {
  const [data, setData] = useState<MealsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeals = async (page: number = 1) => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await MealService.getMeals(page);
        
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };

    loadMeals(1);
  }, []);


  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data || data.data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No meals found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Meals</h2>
          <p className="text-muted-foreground">
            Showing {data.data.currentPageItems} of {data.data.totalItems} meals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.data.data.map((meal: Meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
