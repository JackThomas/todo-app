import { useCallback } from "react";
import { TimePickerInput } from "~/components/core/input/time-picker-input";
import { FormLabel } from "~/components/ui/form";

type TimeRangePayload = {
    start?: string;
    end?: string;
};

interface TimeRangeInputProps {
    value?: {
        start?: string;
        end?: string;
    };
    onChange?: (payload: TimeRangePayload) => void;
}

const TimeRangeInput = ({ value, onChange }: TimeRangeInputProps) => {
    const handleChange = useCallback(
        (nextValue: TimeRangePayload) => {
            onChange?.({ ...value, ...nextValue });
        },
        [value, onChange]
    );

    return (
        <div className="flex w-full gap-2">
            <div className="grow">
                <FormLabel>Start</FormLabel>
                <TimePickerInput
                    value={value?.start}
                    onChange={(value) => handleChange({ start: value })}
                />
            </div>
            <div className="grow">
                <FormLabel>End</FormLabel>
                <TimePickerInput
                    value={value?.end}
                    onChange={(value) => handleChange({ end: value })}
                />
            </div>
        </div>
    );
};

export { TimeRangeInput };
