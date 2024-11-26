import { PlusIcon } from "lucide-react";
import { Logo } from "~/components/core/logo";
import { SidebarMenuFooter } from "~/components/core/sidebar/sidebar-menu-footer";
import { SidebarMenuTasks } from "~/components/core/sidebar/sidebar-menu-tasks";
import { Button } from "~/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarSeparator,
} from "~/components/ui/sidebar";

interface SidebarMainProps {
    handleCreateList: () => void;
}

const SidebarMain = ({ handleCreateList }: SidebarMainProps) => {
    // TODO: Add option to delete/feature lists from sidebar

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader className="py-5">
                <Logo />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Lists</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuTasks />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <Button
                            onClick={handleCreateList}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            <PlusIcon />
                            <span>New List</span>
                        </Button>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenuFooter />
            </SidebarFooter>
        </Sidebar>
    );
};

export { SidebarMain };
