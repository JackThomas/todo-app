import { Badge, BadgeIndicator } from "~/components/ui/badge";

interface TaskTagProps {
    tags: {
        id: string;
        label: string;
        color: {
            id: string;
            name: string;
        };
    }[];
}

const TaskTags = ({ tags }: TaskTagProps) => {
    return (
        <div className="flex gap-2">
            {tags?.map((tag) => (
                <Badge
                    key={tag.id}
                    variant="tag"
                    style={{
                        backgroundColor: `hsl(var(--color-${tag.color.name}-100))`,
                        color: `hsl(var(--color-${tag.color.name}-600))`,
                    }}
                >
                    <BadgeIndicator
                        style={{
                            backgroundColor: `hsl(var(--color-${tag.color.name}-600))`,
                        }}
                    />
                    {tag.label}
                </Badge>
            ))}
        </div>
    );
};

export { TaskTags };
