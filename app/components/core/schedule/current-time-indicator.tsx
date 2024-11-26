interface CurrentTimeIndicatorProps {
    position: number;
    time: string;
}

const CurrentTimeIndicator = ({
    position,
    time,
}: CurrentTimeIndicatorProps) => {
    return (
        <div
            className="absolute left-0 right-0 border-t-2 border-red-500 z-10"
            style={{ top: `${position}%` }}
        >
            <div className="absolute -top-3 -left-14 bg-red-500 text-white text-[10px] py-1 px-2 rounded-full">
                {time}
            </div>
        </div>
    );
};

export { CurrentTimeIndicator };
