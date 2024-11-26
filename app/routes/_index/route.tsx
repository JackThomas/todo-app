import type { MetaFunction } from "@remix-run/node";
import { useAtomValue } from "jotai";
import { PodItem } from "~/components/core/pods/pod-item";
import { Schedule } from "~/components/core/schedule/schedule";
import { getTodos } from "~/helpers/getTodos";
import { useTodosState } from "~/hooks/use-todos-state";

export const meta: MetaFunction = () => {
    return [
        { title: "Todo List - Home" },
        { name: "description", content: "" },
    ];
};

export const clientLoader = () => {
    const list = getTodos();
    return list;
};

// export function HydrateFallback() {
//     return <p>Loading Game...</p>;
// }

export default function Index() {
    const { getFeaturedListsAtom } = useTodosState();
    const getFeaturedLists = useAtomValue(getFeaturedListsAtom);

    // TODO: Add a method of quickly generating dummy data to show off schedule

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-8">
            <div className="md:col-span-3">
                <h2 className="text-xl font-bold mb-4">Featured</h2>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    {getFeaturedLists.map(({ id, ...rest }) => (
                        <PodItem key={id} id={id} {...rest} />
                    ))}
                </div>
            </div>
            <div className="md:col-span-5">
                <h2 className="text-xl font-bold mb-4 pl-14">Todays Tasks</h2>
                <Schedule />
            </div>
        </div>
    );
}
