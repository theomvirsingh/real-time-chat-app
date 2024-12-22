import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiArrowCircleLeft, HiChat, HiUsers } from "react-icons/hi";
import useConversation from "./useConversation";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  return useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathName === "/conversation" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathName === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowCircleLeft,
        onClick: () => signOut(),
      }
    ],
    [pathName, conversationId]
  );
};

export default useRoutes;
