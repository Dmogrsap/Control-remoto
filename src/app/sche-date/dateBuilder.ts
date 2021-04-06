export function FormatDate(date: Date, hour: number, min: number, ampm: string): string {

    if(ampm == "p.m.") {
        hour += 12;
        hour == 24 ? hour = 0 : hour;
    }

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${hour}:${min}:00MST`
}