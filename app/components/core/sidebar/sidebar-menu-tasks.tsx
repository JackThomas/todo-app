import { Link } from "@remix-run/react";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
} from "~/components/ui/sidebar";
import { useTodosState } from "~/hooks/use-todos-state";

const SidebarMenuTasks = () => {
    const { lists } = useTodosState();
    return (
        <SidebarMenu>
            {lists.map((list) => (
                <SidebarMenuItem key={list.id}>
                    <Link to={`/list/${list.id}`}>
                        <SidebarMenuButton className="inline truncate pr-6">
                            {list.title}
                        </SidebarMenuButton>
                        <SidebarMenuBadge>
                            {list.items.filter(({ completed }) => !completed)
                                .length ?? 0}
                        </SidebarMenuBadge>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};

export { SidebarMenuTasks };
