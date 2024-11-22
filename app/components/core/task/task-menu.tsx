import { Ellipsis, Pencil, Trash2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface TaskMenuProps {
    onDelete: () => void;
    onEdit: () => void;
}

const TaskMenu = ({ onDelete, onEdit }: TaskMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                    <Pencil />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer menu-item-delete focus:bg-menu-item-delete focus:text-menu-item-delete"
                    onClick={onDelete}
                >
                    <Trash2Icon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { TaskMenu };
