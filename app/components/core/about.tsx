import { useEffect } from "react";
import { Logo } from "~/components/core/logo";
import { GithubIcon } from "~/components/icons/Github";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "~/components/ui/card";

interface AboutProps {
    lastDeployed: string;
}

const About = ({ lastDeployed }: AboutProps) => {
    const projectInfo = {
        version: "0.0.1",
        description:
            "This project is a Todo application built with modern web technologies.",
        features: ["React", "Remix", "shadcn/ui", "Jotai"],
        stats: {
            lastDeployed,
        },
    };

    const load = async () => {
        const deploymentId = "dpl_8ZQNkgXXt9V4vNf8kQTSLQhDdAr6"; // replace with your own
        // https://vercel.com/support/articles/how-do-i-use-a-vercel-api-access-token
        const accessToken = process.env.VERCEL_ACCESS_TOKEN;
        const result1 = await fetch(`https://api.vercel.com/v13/deployments`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const result = await fetch(
            `https://api.vercel.com/v13/deployments/${deploymentId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const r = await result1.json();
        console.log({ r });

        // ms since epoch for when the deployment finished
        const { ready } = await result.json(); // 1650903484801
        // convert to human-readable date
        const lastDeployedTime = new Date(ready).toLocaleString();
        console.log({ lastDeployedTime });
    };

    useEffect(() => {
        load();
    }, []);

    // TODO: Add live updating version number from package.json
    // TODO: Add live updating last updated date from git commit

    return (
        <Card className="w-[400px] border-none">
            <CardHeader className="text-center">
                <div className="mx-auto mt-4 mb-1 ">
                    <Logo />
                </div>
                <p className="text-xs text-muted-foreground">
                    v{projectInfo.version}
                </p>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-md mb-1">{projectInfo.description}</p>
                    <ul className="list-disc pl-5 text-md">
                        {projectInfo.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>Last Updated:</div>
                        <div className="text-right">
                            {projectInfo.stats.lastDeployed}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/JackThomas/todo-app"
                >
                    <Button variant="ghost" size="sm">
                        <GithubIcon />
                        <span>GitHub</span>
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
};

export { About };
