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
    const [startTime, setStartTime] = useState(getQueryParam("start") || "10:00")
    const [endTime, setEndTime] = useState(getQueryParam("end") || "15:00")
    const [weekdays, setWeekdays] = useState<filterWeekdayState>({ 'm': false, 't': false, 'w': false, 'th': false, 'f': false })
    const [only, setOnly] = useState(true)

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
        prevState[e.target.name as keyof filterWeekdayState] = !weekdays[e.target.name as keyof filterWeekdayState]
        setWeekdays(prevState)
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

            <div className='timetab-container'>
                <div onClick={() => {setOnly(true)}} className={`timetab includes ${only? 'selected' : ''}`}>Only</div>
                <div onClick={() => {setOnly(false)}} className={`timetab only ${!only? 'selected' : ''}`}>Exclude</div>
            </div>
        </>
    )
}

export default TimeFilter