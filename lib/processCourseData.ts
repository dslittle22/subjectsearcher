import { Course } from "@/interfaces/courses";

export const formatProfName = (course: Course) => {
    const {firstname, lastname} = course.meetings.classes[0].instructors[0]
    return firstname + ' ' + lastname
}

export const formatTime = (course: Course) => {
    const timeStr = course.meetings.classes[0].time
    if (timeStr.includes("TBA")) return "meetings TBA";

    let formatted = ''
    const timeStrSplit = timeStr.split(' ')
    const [days, start, _, end] = timeStrSplit
    formatted += days.split('').map(l => l.replace("R", "TH")).join('/')
    formatted += ', '

    const startNon24Hour = String((Number(start.substr(0, 2)) + 11) % 12 + 1)
    const startMinute = start.substr(2) == '00' ? '' : ':' + start.substr(2)
    formatted += startNon24Hour + startMinute + '-'

    const endHour = Number(end.substr(0, 2))
    const endNon24Hour = (endHour + 11) % 12 + 1
    const endMinute = end.substr(2) == '00' ? '' : ':' + end.substr(2) 
    let suffix = endHour < 12 ? 'PM' : 'AM';
    formatted += endNon24Hour + endMinute + suffix;
    return formatted
}