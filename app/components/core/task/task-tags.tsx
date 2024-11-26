import { Tag } from "~/components/core/tag";
import { TagType } from "~/types/tag.type";

interface TaskTagProps {
    tags: TagType[];
}

const TaskTags = ({ tags }: TaskTagProps) => {
    return (
        <div className="flex gap-2">
            {tags?.map((tag) => (
                <Tag key={tag.id} {...tag} />
            ))}
        </div>
    );
};

export { TaskTags };
