"use client";
import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";

interface DesktopSideBarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        {routes.map((item) => (
          <DesktopItem
            key={item.label}
            label={item.label}
            href={item.href}
            onClcik={item.onClick}
            icon={item.icon}
            active={item.active}
          />
        ))}
      </div>
    </>
  );
};

export default DesktopSidebar;
