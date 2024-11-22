import { Plus } from "lucide-react";
import { Logo } from "~/components/core/logo";
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
import { SidebarMenuFooter } from "./sidebar-menu-footer";
import { SidebarMenuTasks } from "./sidebar-menu-tasks";

interface SidebarMainProps {
    handleCreateList: () => void;
}

const SidebarMain = ({ handleCreateList }: SidebarMainProps) => {
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
                            <Plus />
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
