"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart, Heart, LogOut, User, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../context/contextProvider";
import { useAuth } from "@/components/context/AuthProvider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavbarUser() {
  const { carts, hearts } = useContext(userContext);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="cursor-pointer h-9 w-9 hover:ring-2 hover:ring-primary/20 transition-all duration-200">
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {user?.name?.charAt(0) || <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-2" align="end">
        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-medium truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
            </Link>

            <div className="h-px bg-border my-1" />

            <Link
              href="/cart"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart
              </span>
              {carts.length > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 justify-center text-xs">
                  {carts.length}
                </Badge>
              )}
            </Link>

            <Link
              href="/favourite"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favourites
              </span>
              {hearts.length > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 justify-center text-xs">
                  {hearts.length}
                </Badge>
              )}
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <div className="h-px bg-border my-1" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <div className="space-y-1">
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
