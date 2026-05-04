import { MealsList } from "@/components/MealsList";

export function App() {
  return (
    <div className="min-h-svh">
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meals Directory</h1>
            <p className="text-muted-foreground">Discover delicious recipes from around the world</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <MealsList />
      </main>
    </div>
  )
}

export default App
