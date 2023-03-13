export function getTimeDifferenceInSeconds(start, end) {
    const diff = end.getTime() - start.getTime();

    return Math.floor((diff / 1000 ) % 60);
}