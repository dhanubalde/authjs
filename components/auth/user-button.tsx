"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "./logout-button";

const UserButton = () => {
  const user = useCurrentUser()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {!user?.image ?
              <AvatarFallback className=" bg-slate-950">
                <FaUser className=" text-white"/>
              </AvatarFallback>  
              : <div className=" bg-slate-400">
                <AvatarImage src={user?.image || ""} alt={user?.name || "image"}  />
              </div>
            }
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" rounded-md hover: bg-white mt-2 p-1 w-[10rem] shadow-2xl border-none" align="end">
            <LogoutButton >
              <DropdownMenuItem className=" cursor-pointer">
                <ExitIcon className="h-4 w-4 mr-2 " />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
      </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserButton