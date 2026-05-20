import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/NavigationMenu";
import DarkModeSwitcher from "@components/utils/DarkModeSwitcher.tsx";
import { useViewport } from "@uireact/tools";
import { Menu } from "lucide-react";
import type { NavItem } from "~/types";

export default function Navigation({ nav }: { nav: NavItem[] }) {
  const { isSmall } = useViewport();

  const linkAction = (itemId: string) => {
    document.getElementById(`${itemId}-details`)?.setAttribute("open", "true");
  };

  const navItems = nav.map((item: NavItem) => (
    <NavigationMenuItem key={`nav-${item.id}`} className="py-1">
      <NavigationMenuLink
        className="text-xl"
        closeOnClick={true}
        href={`/${item.path}`}
        tabIndex={0}
        data-link={`${item.id}`}
        onClick={() => linkAction(item.id)}
      >
        {item.text}
      </NavigationMenuLink>
    </NavigationMenuItem>
  ));

  return (
    <NavigationMenu id="navigation-links" className="min-w-full">
      <NavigationMenuList className="flex items-end justify-between sm:justify-center gap-5 order-2 px-4">
        {!isSmall ? (
          navItems
        ) : (
          <NavigationMenuItem value="main">
            <NavigationMenuTrigger className="bg-transparent border-visible">
              <Menu />
            </NavigationMenuTrigger>
            <NavigationMenuContent
              keepMounted={true}
              className="list-none w-40 p-4 bg-background border-visible"
            >
              <NavigationMenuList className="flex flex-col m-0 pl-0 items-start">
                {navItems}
              </NavigationMenuList>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <DarkModeSwitcher />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
