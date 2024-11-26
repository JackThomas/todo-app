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
    version: string;
}

const About = ({ lastDeployed, version }: AboutProps) => {
    const projectInfo = {
        version,
        description:
            "This project is a Todo application built with modern web technologies.",
        features: ["React", "Remix", "shadcn/ui", "Jotai"],
        stats: {
            lastDeployed,
        },
    };

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
                    <p className="text-md mb-1 text-center">
                        {projectInfo.description}
                    </p>
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
