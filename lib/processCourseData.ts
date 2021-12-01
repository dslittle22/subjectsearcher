import { Course } from "@/interfaces/courses";
import { type } from "os";
import { resourceLimits } from "worker_threads";

export const formatProfName = (course: Course) => {
    if (typeof course.meetings.classes[0] === 'undefined') return 'Unknown professor' 
    if (typeof course.meetings.classes[0].instructors[0] === 'undefined') return 'Unknown' 

    const {firstname, lastname} = course.meetings.classes[0].instructors[0]
    return firstname + ' ' + lastname
}

export const formatTime = (course: Course) => {
    if (typeof course.meetings.classes[0] === "undefined") return 'Unknown meeting time'
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
    let suffix = endHour < 12 ? 'AM' : 'PM';
    formatted += endNon24Hour + endMinute + suffix;
    return formatted
}

export const trimCouse = (course: Course) => {
    delete course.comment
    delete course.dept
    delete course.dept_desc
    delete course.term
    delete course.originnum
    delete course.originsubj
    delete course.crosslisting
    delete course.rules.equivalent
    delete course.rules.mmrest
    delete course.rules.coreq
    delete course.prefmajors
    delete course.prefminors
    delete course.addlmajmin
    return course
}