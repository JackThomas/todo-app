import { Link, useMatches } from "@remix-run/react";
import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

const Breadcrumbs = () => {
    const matches = useMatches();

    const filtered = matches.filter(
        (match) => match.handle && match.handle?.breadcrumb
    );

    const crumbs = filtered.map((match, index) => {
        const { id, handle } = match;
        const { href, label } = handle.breadcrumb(match);
        return { id, label, href, isLast: index === filtered.length - 1 };
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map(({ id, label, href, isLast }) => (
                    <Fragment key={id}>
                        <BreadcrumbItem>
                            {!isLast ? (
                                <>
                                    <Link to={href}>{label}</Link>
                                </>
                            ) : (
                                <BreadcrumbPage>{label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>

                        {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export { Breadcrumbs };
