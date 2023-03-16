export const NumberToMonth = {
    "0": "Jan",
    "1": "Feb",
    "2": "Mar",
    "3": "Apr",
    "4": "May",
    "5": "Jun",
    "6": "Jul",
    "7": "Aug",
    "8": "Sep",
    "9": "Oct",
    "10": "Nov",
    "11": "Dec",
}

export function getTimeDifferenceInSeconds(start, end) {
    const diff = end.getTime() - start.getTime();

    return Math.floor((diff / 1000 ) % 60);
}

export function getTimeDifference(start, end) {
    const diff = Math.abs(end.getTime() - start.getTime());
    
    const days = Math.floor(diff/(1000 * 60 * 60 * 24));

    const hours = Math.floor((diff/(1000 * 60 * 60))) % 24;

    const minutes = Math.floor((diff/(1000 * 60)) % 60);

    const seconds = Math.floor((diff/(1000)) % 60);

    let format = "";

    if (days <= 0) {
        format = "HM";
    } else {
        format = "D";
    }

    if (hours <= 0) {
        format = "MS";
    } else {
        format += "H";
    }

    if (minutes <= 0) {
        format = "S";
    } else {
        format += "MS";
    }

    if (format === "DHMS") {
        return `${days} days ${hours} hr ${minutes} mins ago`;
    } else if (format === "HMS") {
        return `${hours} hr ${minutes} mins ago`;
    } else if (format === "MS") {
        return `${minutes} mins ${seconds} ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}

export function getTimeUTCFormatted(timestamp) {
    const datetime = new Date(timestamp);

    const year = datetime.getUTCFullYear();
    const month = datetime.getUTCMonth().toString();
    const day = datetime.getUTCDate().toString().padStart(2, "0");

    const hour = datetime.getUTCHours().toString().padStart(2, "0");
    const minutes = datetime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = datetime.getUTCSeconds().toString().padStart(2, "0");

    return `${NumberToMonth[month]}-${day}-${year} ${hour}:${minutes}:${seconds} +UTC`;
}
