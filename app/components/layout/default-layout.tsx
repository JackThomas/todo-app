import { ReactNode } from "react";
import { Breadcrumbs } from "~/components/core/breadcrumbs";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import { useTodosState } from "~/hooks/use-todos-state";
import { SidebarMain } from "../core/sidebar/sidebar-main";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const { createList } = useTodosState();

    const handleCreateList = () => {
        createList({ title: "New list" });
    };

    return (
        <SidebarProvider>
            <SidebarMain handleCreateList={handleCreateList} />
            <SidebarInset>
                <header className="flex shrink-0 items-center py-5 px-4">
                    <div className="flex shrink-0 items-center gap-2 ">
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumbs />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export { DefaultLayout };
