const PodItem = () => {
    const title = "List Title";
    const count = 5;

    return (
        <div className="w-full aspect-square bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col items-flex-start p-4">
            <div className="text-gray-500 text-xs font-medium tracking-wide pt-2">
                {title}
            </div>
            <div className="text-[84px] leading-none font-semibold mt-[auto]">
                {count}
            </div>
        </div>
    );
};

export { PodItem };
