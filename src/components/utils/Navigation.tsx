import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/NavigationMenu";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { useViewport, ViewportContext } from "~/hooks/useViewport";
import type { NavItem } from "~/types";

export default function Navigation({ nav }: { nav: NavItem[] }) {
  useContext(ViewportContext);
  const { isXSmall } = useViewport();

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

  const mobileNav = (
    <NavigationMenu data-testid="navigation">
      <NavigationMenuList className="flex items-end justify-between sm:justify-center gap-5 order-2 px-4">
        <NavigationMenuItem value="main">
          <NavigationMenuTrigger
            data-testid="navigation-trigger"
            className="bg-transparent border-visible"
          >
            <Menu />
          </NavigationMenuTrigger>
          <NavigationMenuContent
            keepMounted={true}
            className="list-none w-40 p-4 bg-background border-visible"
          >
            <NavigationMenuList
              data-testid="navigation-links"
              className="flex flex-col m-0 pl-0 items-start"
            >
              {navItems}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  const desktopNav = (
    <NavigationMenu data-testid="navigation">
      <NavigationMenuList
        data-testid="navigation-links"
        className="flex items-end justify-between sm:justify-center gap-5 order-2 px-4"
      >
        {navItems}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return isXSmall ? mobileNav : desktopNav;
}
