"use client";

import * as React from "react";
import { Bell, MessageSquareMore } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export type AppHeaderProps = {
  title: string;
  rightActions?: React.ReactNode;
};

export function AppHeader({ title, rightActions }: AppHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[20px] font-bold tracking-tight text-(--ds-color-accent)">
        {title}
      </div>

      <div className="flex items-center gap-2">
        {rightActions ?? (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full p-0 text-near-black"
              aria-label="Thông báo"
              onClick={() => console.log("notifications")}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full p-0 text-near-black"
              aria-label="Tin nhắn"
              onClick={() => console.log("messages")}
            >
              <MessageSquareMore className="h-5 w-5" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

