import { Link } from "@remix-run/react";
import { useAtom } from "jotai";
import {
    MoreHorizontalIcon,
    PencilIcon,
    StarIcon,
    Trash2Icon,
} from "lucide-react";
import { useCallback, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useListState } from "~/hooks/use-list-state";
import { ItemType } from "~/types/list.type";

interface SidebarMenuTasksItemProps {
    id: string;
    title: string;
    items: ItemType[];
}
const SidebarMenuTasksItem = ({
    id,
    title,
    items,
}: SidebarMenuTasksItemProps) => {
    const { isFeaturedAtom } = useListState(id);
    const [active, setActive] = useState<string | null>(null);
    const [isFeatured, setIsFeatured] = useAtom(isFeaturedAtom);

    const handleOnFeatured = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsFeatured((prev) => (prev ? !prev : true));
    };

    const isDropdownActive = useCallback(
        (id: string) => active === id,
        [active]
    );

    const isActive = isDropdownActive(id);
    const count = items.filter(({ completed }) => !completed).length ?? 0;

    return (
        <SidebarMenuItem key={id}>
            <div className="flex group/menuitem">
                <Link to={`/list/${id}`} className="grow">
                    <SidebarMenuButton
                        className={`inline truncate pr-6 group-hover/menuitem:bg-sidebar-accent
                        ${isActive ? "bg-sidebar-accent" : ""}`}
                    >
                        {title}
                    </SidebarMenuButton>
                    <SidebarMenuBadge
                        className={`transition-transform group-hover/menuitem:-translate-x-6 ${
                            isActive ? "-translate-x-6" : ""
                        }`}
                    >
                        {count}
                    </SidebarMenuBadge>
                </Link>
                <DropdownMenu
                    onOpenChange={(isOpen: boolean) =>
                        setActive(isOpen ? id : null)
                    }
                >
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuAction
                            className={`absolute right-2 opacity-0 transition-opacity group-hover/menuitem:opacity-100 ${
                                isActive ? "opacity-100" : ""
                            }`}
                        >
                            <MoreHorizontalIcon />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleOnFeatured}
                        >
                            <StarIcon
                                fill={
                                    isFeatured
                                        ? "hsl(var(--color-yellow-400))"
                                        : "hsl(var(--color-slate-200))"
                                }
                                stroke={
                                    isFeatured
                                        ? "hsl(var(--color-yellow-400))"
                                        : "hsl(var(--color-slate-200))"
                                }
                                className="transition"
                            />
                            {isFeatured ? "Remove" : "Set"} Featured
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <PencilIcon />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer menu-item-delete focus:bg-menu-item-delete focus:text-menu-item-delete"
                            // onClick={onDelete}
                        >
                            <Trash2Icon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SidebarMenuItem>
    );
};

export { SidebarMenuTasksItem };
