import { Link } from "@remix-run/react";
import { ItemType } from "~/types/list.type";

interface PodItemProps {
    id: string;
    title: string;
    items: ItemType[];
}

const PodItem = ({ id, title, items }: PodItemProps) => {
    const count = items.filter(({ completed }) => !completed).length;

    return (
        <Link to={`/list/${id}`}>
            <div className="w-full aspect-square bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col items-flex-start p-4">
                <div className="text-gray-500 text-xs font-medium tracking-wide pt-1">
                    {title}
                </div>
                <div className="text-[84px] leading-none font-semibold mt-[auto]">
                    {count}
                </div>
            </div>
        </Link>
    );
};

export { PodItem };
