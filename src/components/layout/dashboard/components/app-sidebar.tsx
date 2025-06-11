"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  BookOpenText,
  ChartBarStacked,
  ChartNoAxesCombined,
  ChartPie,
  LayoutDashboard,
  BookMinus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavItem({ href, icon, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg transition-colors duration-200",
        isActive
          ? "bg-blue-50 text-blue-700"
          : "hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function SidebarListItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "block px-6 py-1.5 mb-1 text-sm rounded-md transition-colors",
        isActive
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {label}
    </Link>
  );
}

export default function AppSideBarBook() {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">KHMENG CODER</h1>
      </div>
      <nav className="space-y-1 px-2">
        <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />}>
          Dashboard
        </NavItem>
        <NavItem href="#" icon={<ChartPie size={20} />}>
          Presentations
        </NavItem>
        <NavItem href="#" icon={<ChartNoAxesCombined size={20} />}>
          Analytics
        </NavItem>
        <section className="py-3">
          <p className="px-3 text-xs font-medium uppercase text-gray-500">
            Collections
          </p>
          <section className="mt-2">
            {/* Book */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 px-3 text-gray-700 hover:bg-gray-50">
                  {" "}
                  <p className="flex justify-start gap-2">
                    {" "}
                    <BookMinus size={20} /> Book{" "}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <SidebarListItem
                    href="/dashboard/books"
                    label="List All Books"
                  />
                  <SidebarListItem
                    href="/dashboard/books/create"
                    label="Create Book"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Author */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 px-3 text-gray-700 hover:bg-gray-50">
                  {" "}
                  <p className="flex justify-start gap-2">
                    {" "}
                    <BookOpenText size={20} /> Author{" "}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <SidebarListItem
                    href="/dashboard/authors"
                    label="List All Authors"
                  />
                  <SidebarListItem
                    href="/dashboard/authors/create"
                    label="Create Author"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Categories */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 px-3 text-gray-700 hover:bg-gray-50">
                  {" "}
                  <p className="flex justify-start gap-2">
                    {" "}
                    <ChartBarStacked size={20} /> Categories{" "}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <SidebarListItem
                    href="/dashboard/categories"
                    label="List All Categories"
                  />
                  <SidebarListItem
                    href="/dashboard/categories/create"
                    label="Create Categories"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </section>
      </nav>
    </div>
  );
}
