"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";
import { links } from "@/utils/links";
import { Button } from "./ui/button";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full flex flex-col items-center gap-20">
      <Image src={Logo} alt="logo image" />
      <div className="flex flex-col gap-4 w-full">
        {links.map((link) => {
          return (
            <Button asChild key={link.label} variant={pathname === link.href ? 'default' : 'link'}>
              <Link href={link.href} className="flex gap-2">
                {link.icon}
                <p className="capitalize">{link.label}</p>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
