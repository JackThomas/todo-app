import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/core/about";
import { DefaultLayout } from "~/components/layout/default-layout";
import { getTodos } from "~/helpers/getTodos";

export const meta: MetaFunction = () => {
    return [
        { title: "Todo List - About" },
        { name: "description", content: "" },
    ];
};

export const handle = {
    breadcrumb: () => ({
        href: "/about",
        label: "About",
    }),
};

export const clientLoader = () => {
    const list = getTodos();
    return list;
};

export default function Index() {
    return (
        <DefaultLayout>
            <div className="flex grow items-center m-[auto] pb-20">
                <About />
            </div>
        </DefaultLayout>
    );
}
