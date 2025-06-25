import { NavItem } from "@/types";

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Product",
    url: "/dashboard/product",
    icon: "product",
    shortcut: ["p", "p"],
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Books",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "book",
    isActive: true,
    items: [
      {
        title: "List Book",
        url: "/dashboard/books",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Create Book",
        url: "/dashboard/books/create",
        icon: "login",
        shortcut: ["l", "l"],
      },
    ],
  },
  {
    title: "Authors",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "authors",
    isActive: true,

    items: [
      {
        title: "List Author",
        url: "/dashboard/authors",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Create Author",
        url: "/dashboard/authors/create",
        icon: "login",
        shortcut: ["l", "l"],
      },
    ],
  },
  {
    title: "Categories",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "categories",
    isActive: true,

    items: [
      {
        title: "List Categories",
        url: "/dashboard/categories",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Create Categories",
        url: "/dashboard/categories/create",
        icon: "login",
        shortcut: ["l", "l"],
      },
    ],
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    icon: "kanban",
    shortcut: ["k", "k"],
    isActive: false,
    items: [], // No child items
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    image: "https://api.slingacademy.com/public/sample-users/1.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/2.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    image: "https://api.slingacademy.com/public/sample-users/3.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    image: "https://api.slingacademy.com/public/sample-users/4.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/5.png",
    initials: "SD",
  },
];
