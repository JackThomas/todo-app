import type { MetaFunction } from "@remix-run/node";
import { PodItem } from "~/components/core/pods/pod-item";
import { TaskList } from "~/components/core/task-list/task-list";
import { DefaultLayout } from "~/components/layout/default-layout";
import { getTodos } from "~/helpers/getTodos";

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

export default function Index() {
    return (
        <DefaultLayout>
            <div className="grid auto-rows-min gap-4 md:grid-cols-8">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 md:col-span-3">
                    <PodItem />
                    <PodItem />
                </div>
                <div className="md:col-span-5">
                    <TaskList />
                </div>
            </div>
        </DefaultLayout>
    );
}
