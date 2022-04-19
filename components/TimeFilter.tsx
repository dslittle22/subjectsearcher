import React, { useState, useEffect } from 'react'
import {
    addQueryParam,
    getQueryParam,
    getTimeFilterFunction
} from '@/lib/filterLogic';
import { Course } from '@/interfaces/courses';
import { capitalize } from '@/lib/misc';


interface Props {
    filterKey: string,
    onFilterChange: (
        filterKey: string,
        filterFunction?: ((course: Course) => boolean) | undefined
    ) => void;
}

export interface filterWeekdayState {
    'm': boolean, 't': boolean, 'w': boolean, 'th': boolean, 'f': boolean
}

const TimeFilter = ({ filterKey, onFilterChange }: Props) => {

    const initialWeekdaysState = { 'm': false, 't': false, 'w': false, 'th': false, 'f': false }
    const weekdayStateStr = getQueryParam("daysChecked");
    if (weekdayStateStr) {
        weekdayStateStr.split('-').forEach(day => initialWeekdaysState[day as keyof filterWeekdayState] = true)
    }
    const [weekdays, setWeekdays] = useState<filterWeekdayState>(initialWeekdaysState)
    const [startTime, setStartTime] = useState(getQueryParam("start") || "10:00")
    const [endTime, setEndTime] = useState(getQueryParam("end") || "15:00")
    const [only, setOnly] = useState(!(getQueryParam('timeMode') === 'exclude'))

    useEffect(() => {
        const colonRemovedStart = startTime.slice(0, 2) + startTime.slice(3, startTime.length)
        const colonRemovedEnd = endTime.slice(0, 2) + endTime.slice(3, endTime.length)
        onFilterChange(filterKey, getTimeFilterFunction(colonRemovedStart, colonRemovedEnd, weekdays, only));
    }, [startTime, endTime, weekdays, only]);


    const handleStartChange = (e: any) => {
        const newTime = e.target.value
        addQueryParam("start", newTime)
        setStartTime(newTime)
    }

    const handleEndChange = (e: any) => {
        const newTime = e.target.value
        addQueryParam("end", newTime)
        setEndTime(newTime)
    }

    const handleWeekdayCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let prevState = Object.assign({}, weekdays);
        const weekday: keyof filterWeekdayState = e.target.name as keyof filterWeekdayState;
        prevState[weekday] = !weekdays[weekday]
        setWeekdays(prevState)
        addQueryParam("daysChecked", Object.keys(prevState).filter(day => prevState[day as keyof filterWeekdayState] === true).join('-'))
    }

    const handleTimetabChange = (e: any) => {
        if (e.target.id === 'only') {
            setOnly(true)
            addQueryParam('timeMode', 'only')
        } else {
            setOnly(false)
            addQueryParam('timeMode', 'exclude')
        }
    }

    return (
        <>
            <div className='timefilter-container'>

                <div className='timepicker-container'>
                    <div className='start-timepicker timepicker'>
                        <label htmlFor="start">Start time: </label>
                        <input onChange={handleStartChange} type="time" id="start" name="start" min="07:00" max="21:59" value={startTime} />
                    </div>
                    <div className='end-timepicker timepicker'>
                        <label htmlFor="end">End time: </label>
                        <input onChange={handleEndChange} type="time" id="end" name="end" min="07:00" max="21:59" value={endTime} />
                    </div>
                </div>

                <div className='weekdays-container'>
                    {Object.keys(weekdays).map((weekday, i) => (
                        <div key={weekday} className={`weekday ${weekday}`}>
                            <label htmlFor={weekday}>
                                {capitalize(weekday)}
                            </label>
                            <input
                                onChange={handleWeekdayCheckboxChange}
                                checked={weekdays[weekday as keyof filterWeekdayState]}
                                type='checkbox'
                                id={weekday}
                                name={weekday}
                            />
                        </div>
                    ))}

                </div>
            </div>
            <p>Courses are not filtered by time if no days are checked.</p>

            <div className='timetab-container'>
                <div onClick={handleTimetabChange} id='only' className={`timetab includes ${only ? 'selected' : ''}`}>Only</div>
                <div onClick={handleTimetabChange} id='exclude' className={`timetab only ${!only ? 'selected' : ''}`}>Exclude</div>
            </div>
        </>
    )
}

export default TimeFilter