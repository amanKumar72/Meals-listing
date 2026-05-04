import type { MealsResponse } from '@/types/meal';

const API_BASE_URL = 'https://api.freeapi.app/api/v1/public/meals';

export class MealService {
  private static async fetchFromAPI(endpoint: string): Promise<MealsResponse> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch meals: ${response.statusText}`);
    }
    
    return response.json();
  }

  static async getMeals(page: number = 1, limit: number = 100000): Promise<MealsResponse> {
    return this.fetchFromAPI(`?page=${page}&limit=${limit}`);
  }
}
