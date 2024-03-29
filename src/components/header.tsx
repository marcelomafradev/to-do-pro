"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { ToggleTheme } from "./toggle-theme";
import SliderMarquee from "./slider-marquee";
import DrawerDialog from "./drawer-dialog";
import { useEffect } from "react";

const Header = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification("Welcome!", "You're ready to start.");
        }
      });
    }
  }, []);

  const showNotification = (title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
      });
    }
  };

  return (
    <header className="flex flex-col pb-5 pt-10 md:pb-8 md:pt-12">
      <nav className="container flex items-center justify-center gap-4">
        {user && isLoaded ? (
          <div className="flex flex-row items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-16 h-16",
                },
              }}
            />

            <div className="flex max-w-[150px] flex-col md:max-w-none">
              <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
                {user.fullName}
              </h1>
              <span className="truncate text-xs text-muted-foreground md:text-sm">
                {user.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Skeleton className="h-16 w-16 rounded-full" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-40 rounded-full" />
              <Skeleton className="h-3 w-40 rounded-full" />
            </div>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          <DrawerDialog />
          <ToggleTheme />
        </div>
      </nav>

      <SliderMarquee />
    </header>
  );
};

export default Header;
