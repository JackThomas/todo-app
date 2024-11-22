import { Link } from "@remix-run/react";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "~/components/ui/sidebar";

const SidebarMenuFooter = () => {
    const links = [
        {
            id: "link_home",
            href: "/",
            label: "Home",
        },
        {
            id: "link_about",
            href: "/about",
            label: "About",
        },
    ];

    return (
        <SidebarMenu>
            {links.map(({ id, label, href }) => (
                <SidebarMenuItem key={id}>
                    <Link to={href}>
                        <SidebarMenuButton>{label}</SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};

export { SidebarMenuFooter };
