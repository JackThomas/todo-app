import type { MetaFunction } from "@remix-run/node";
import { BlockerFunction, useLoaderData } from "@remix-run/react";
import { About } from "~/components/core/about";
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
    background: "hsl(var(--color-gray-100))",
};

type LoaderData = {
    lastDeployed: string;
};

export const loader: BlockerFunction = async () => {
    console.log();
    const accessToken = process.env.VERCEL_ACCESS_TOKEN;

    const result = await fetch(
        `https://api.vercel.com/v6/deployments?app=todo-app&limit=1`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const response = await result.json();
    const { ready } = response.deployments[0];
    const lastDeployed = new Date(ready).toLocaleString().split(",")[0];

    return { lastDeployed };
};

export const clientLoader = () => {
    const list = getTodos();
    return list;
};

export default function Index() {
    const { lastDeployed } = useLoaderData<LoaderData>();

    return (
        <div className="flex grow items-center m-[auto] pb-20">
            <About lastDeployed={lastDeployed} />
        </div>
    );
}
