import { Leaf, Home, Calculator, History, BarChart3 } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", to: "/", icon: Home },
  { name: "Dashboard", to: "/dashboard", icon: BarChart3 },
  { name: "Calculator", to: "/calculator", icon: Calculator },
  { name: "History", to: "/history", icon: History },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Carbon Quest</span>
          </div>
          
          <nav className="ml-auto flex gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Track your carbon footprint and make a difference 🌱</p>
        </div>
      </footer>
    </div>
  );
}
