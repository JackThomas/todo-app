import { XIcon } from "lucide-react";
import { Badge, BadgeIndicator } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface TagProps {
    id?: string;
    color?: {
        name: string;
        hex: string;
    };
    label: string;
    onDelete?: (id: string) => void;
}

const Tag = ({ id, color, label, onDelete }: TagProps) => {
    const colorName = color?.name ?? "slate";

    const secondaryColor = `hsl(var(--color-${colorName}-100))`;
    const primaryColor = `hsl(var(--color-${colorName}-600))`;

    const handleDelete = () => {
        if (id) {
            onDelete?.(id);
        }
    };

    return (
        <Badge
            variant="tag"
            style={{
                backgroundColor: secondaryColor,
                color: primaryColor,
            }}
        >
            <BadgeIndicator
                style={{
                    backgroundColor: primaryColor,
                }}
            />
            {label}

            {onDelete && (
                <Button
                    variant="link"
                    size="xs-icon"
                    style={{ color: primaryColor, marginLeft: "0.25rem" }}
                    onClick={handleDelete}
                >
                    <XIcon />
                </Button>
            )}
        </Badge>
    );
};

export { Tag };
