interface Handle {
    background?: string;
    breadcrumb?: () => void;
}

declare module "@remix-run/router" {
    export type AgnosticIndexRouteObject = Omit<
        import("@remix-run/router/dist/utils").AgnosticIndexRouteObject,
        "handle"
    > & { handle: Handle };

    export type AgnosticNonIndexRouteObject = Omit<
        import("@remix-run/router/dist/utils").AgnosticNonIndexRouteObject,
        "handle"
    > & { handle: Handle };
}
