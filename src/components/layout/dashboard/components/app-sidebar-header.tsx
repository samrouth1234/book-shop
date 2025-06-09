import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Grid, Search } from "lucide-react";

import Image from "next/image";
import Logo from "../../../../../public/images/404.png"

export default function AppSideBarHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search files..." className="pl-9" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Grid className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image
            src={Logo}
            alt="Avatar"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}