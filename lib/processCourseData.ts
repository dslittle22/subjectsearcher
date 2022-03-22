import { Course, meetingTimes } from '@/interfaces/courses';
import { capitalize } from './misc';

/**
 * 
 * @param course the course to set meetingTime attribute
 * sets the meetingTime attribute, to an empty object if 
 * no meetings available or time TBA, otherwise to the 
 * specified object
 */
const parseTime = (course: Course) => {
  if (!course.meetings || course.meetings.classes.length === 0) {
    course.meetingTimes = {};
    return;
  }

  const courseMeetingTimes: meetingTimes = {}
  course.meetings.classes.forEach(meeting => {
    const timeStr = meeting.time
    if (!timeStr.includes("TBA")) {
    const [days, start, _, end] = timeStr.split(' ');
      const daysSplit = days.split('')
      daysSplit.forEach(day => {
        if (day.toLocaleLowerCase() === 'r') day = 'th'
        courseMeetingTimes[day.toLocaleLowerCase() as keyof meetingTimes] = {start, end}
      })
    }
  });
  course.meetingTimes = courseMeetingTimes;
}


const formatTimes = (start: string, end: string): string => {
  let formatted = ''
  const startNon24Hour = String(
    ((Number(start.substring(0, 2)) + 11) % 12) + 1
  );
  const startMinute =
    start.substring(2) == '00' ? '' : ':' + start.substring(2);
  formatted += startNon24Hour + startMinute + '-';

  const endHour = Number(end.substring(0, 2));
  const endNon24Hour = ((endHour + 11) % 12) + 1;
  const endMinute = end.substring(2) == '00' ? '' : ':' + end.substring(2);
  let suffix = endHour < 12 || end == '2400' ? 'AM' : 'PM';
  formatted += endNon24Hour + endMinute + suffix;
  return formatted;
}

export const formatCourseTimes = (course: Course) => {
  if (!course.meetingTimes || JSON.stringify(course.meetingTimes) === '{}') return "TBA"

  // check if all days have the same times

  const times: {[key: string]: string[] | undefined;} = {}
  Object.entries 
  for (const [day, {start, end}] of Object.entries(course.meetingTimes)) {
    const formattedTime = formatTimes(start, end)
    if (times[formattedTime] === undefined) {
      times[formattedTime] = [day]
    } else {
      times[formattedTime]?.push(day)
    }
  }

  const allTimesFormatted: string[] = []
  for (const [time, days] of Object.entries(times)) {
    if (days !== undefined) {
      const daysStr = days.map(day => capitalize(day)).join("/")
      allTimesFormatted.push(daysStr + ', ' + time)
    }
  }
  return allTimesFormatted.join('; ')
};



export const trimCourse = (course: Course) => {
  delete course.comment;
  delete course.dept;
  delete course.dept_desc;
  delete course.originnum;
  delete course.originsubj;
  delete course.crosslisting;
  delete course.rules.equivalent;
  delete course.rules.mmrest;
  delete course.rules.coreq;
  delete course.prefmajors;
  delete course.prefminors;
  delete course.addlmajmin;
  const profNames = new Set();
  course.meetings.classes.forEach(class_ => {
    class_.instructors.forEach(instructor => {
      profNames.add(instructor.firstname + ' ' + instructor.lastname);
    });
  });
  course.allprofs = Array.from(profNames).join(', ');
  parseTime(course)
  return course;
};
