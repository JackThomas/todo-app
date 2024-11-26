import type { LinksFunction } from "@remix-run/node";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import { PropsWithChildren } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { useInitState } from "./hooks/use-init-state";
import "./tailwind.css";

export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export const handle = {
    breadcrumb: () => ({
        href: "/",
        label: "Home",
    }),
};

// export const clientLoader = () => {
//     const list = getTodos();
//     return list;
// };

function Document({ children, title }: PropsWithChildren<{ title?: string }>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                {title ? <title>{title}</title> : null}
                <Links />
            </head>
            <body>
                <SidebarProvider>{children}</SidebarProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    useInitState();

    return (
        <Document>
            {/* <DefaultLayout> */}
            <Outlet />
            {/* </DefaultLayout> */}
        </Document>
    );
}

// export function ErrorBoundary() {
//     const error = useRouteError();
//     // const data = useLoaderData();

//     if (isRouteErrorResponse(error)) {
//         const { status, statusText } = error as ErrorResponse;

//         return (
//             // <Document title={`${status} ${statusText}`}>
//             //     <div className="flex grow items-center m-[auto] pb-20">
//             //         <PageNotFound />
//             //     </div>
//             // </Document>
//             <div className="flex grow items-center m-[auto] pb-20">
//                 <PageNotFound />
//             </div>
//         );
//     }

//     const errorMessage =
//         error instanceof Error ? error.message : "Unknown error";
//     return (
//         // <Document title="Uh-oh!">
//         //     <div className="error-container">
//         //         <h1>App Error</h1>
//         //         <pre>{errorMessage}</pre>
//         //     </div>
//         // </Document>

//         <div className="error-container">
//             <h1>App Error</h1>
//             <pre>{errorMessage}</pre>
//         </div>
//     );
// }
