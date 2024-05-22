import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "@/utils/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const LinksDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:hidden" asChild>
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 lg:hidden"
        sideOffset={25}
        align="start"
      >
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.label}>
              <Link href={link.href} className="flex gap-2 items-center">
                {link.icon}
                <p className="capitalize">{link.label}</p>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropDown;
