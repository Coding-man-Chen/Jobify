import { UserButton } from "@clerk/nextjs";
import LinksDropDown from "./LinksDropDown";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-muted px-4 sm:px-16 lg:px-24 flex items-center justify-between py-6">
      <div>
        <LinksDropDown />
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
