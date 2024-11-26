export function getCurrentTimePosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const scheduleMinutes = 24 * 60; // 24 hours

    const position = (totalMinutes / scheduleMinutes) * 100;
    return {
        position: Math.max(0, Math.min(100, position)),
        currentTime: `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`,
    };
}

export function cloneScrollPosition(
    source: HTMLElement | null,
    target: HTMLElement | null
) {
    if (!source || !target) return;
    const sourceHeight = source.scrollHeight - source.clientHeight;
    const targetHeight = target.scrollHeight - target.clientHeight;
    const top = (source.scrollTop / sourceHeight) * targetHeight;

    target.scroll({
        top,
    });
}
