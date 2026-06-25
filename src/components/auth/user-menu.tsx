"use client";

import { User } from "lucide-react";
import { LogoutButton } from "./logout-button";

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{user.name}</span>
      </div>
      <LogoutButton />
    </div>
  );
}
