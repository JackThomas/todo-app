import { CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { colors as palette } from "~/lib/colors";

interface Color {
    name: string;
    hex: string;
}

const colors: Color[] = Object.entries(palette).map(([name, values]) => {
    return { name, hex: values[500] };
});

interface ColorSelectorProps {
    onChange: (color: Color) => void;
}

const ColorSelector = ({ onChange }: ColorSelectorProps) => {
    const [selected, setSelected] = useState(colors[0]);
    const selectedRef = useRef(selected);

    const handleSelectColor = (
        e: React.MouseEvent<HTMLButtonElement>,
        color: Color
    ) => {
        e.preventDefault();
        setSelected(color);
    };

    useEffect(() => {
        if (selectedRef.current !== selected) {
            onChange(selected);
            selectedRef.current = selected;
        }
    }, [selected, onChange]);

    return (
        <div className="">
            <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                    <Button
                        // focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400
                        key={color.name}
                        className={`w-full aspect-square h-[auto] ${
                            selected.name === color.name
                                ? "ring ring-2 ring-offset-2 ring-offset-white ring-gray-400"
                                : ""
                        }`}
                        style={
                            {
                                backgroundColor: `hsl(var(--color-${color.name}-500))`,
                                "--tw-ring-color": `hsl(var(--color-${color.name}-300))`,
                            } as React.CSSProperties
                        }
                        onClick={(e) => handleSelectColor(e, color)}
                        aria-label={`Select ${color.name} color`}
                        aria-pressed={selected.name === color.name}
                    >
                        {selected.name === color.name && (
                            <CheckIcon className="w-6 h-6 text-white mx-auto" />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export { ColorSelector, type Color };
