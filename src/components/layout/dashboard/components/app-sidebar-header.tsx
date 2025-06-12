import Image from "next/image";

import Logo from "@/../../public/images/cat-cute.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Bell, Grid, Search } from "lucide-react";

export default function AppSideBarHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search files..." className="pl-9" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Grid size={20} />
        </div>
        <div>
          <Bell size={20} />
        </div>
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
  );
}
