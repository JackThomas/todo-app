import { SidebarMenu } from "~/components/ui/sidebar";
import { useTodosState } from "~/hooks/use-todos-state";
import { SidebarMenuTasksItem } from "./sidebar-menu-tasks-item";

const SidebarMenuTasks = () => {
    const { lists } = useTodosState();

    return (
        <SidebarMenu>
            {lists.map(({ id, ...rest }) => (
                <SidebarMenuTasksItem key={id} id={id} {...rest} />
            ))}
        </SidebarMenu>
    );
};

export { SidebarMenuTasks };
