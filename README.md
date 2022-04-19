Welcome to SubjectSearcher, a faster replacement for Classfinder!

Current bug: when reloading the page with filters set, they will show up in the UI upon refreshing, but they often won't apply. 

Why is this bug showing up? On initial page load, each of the 4 filters (subject, prof, subject, time) will call the onFilterChange function with their filter function. We can see in the Filters.tsx component that this function sets filteredCourses to equal applyFilters(courses, updatedFilters), and also updates filters to include the newly changed one that called this function.

It seems like what's happening is that one filter is updating filteredCourses, and then before the state update to 'filters' propagates, a different filter calls the function. It seems like this is what's happening because In each of these 4 function calls, the "filters" state object is previously empty. 

Possible ways to solve this:
- figure out the react-y way to go about this, and maybe make all the state updates wait for each other?
- make the initial setstate call a *different* function than onFilterChange, and have that new function async await for the setState update to finish?
we'd need to make a new function, similar to onFilterChange but that only runs when the filters load initially.
The function would copy all courses into a new variable, initFilteredCourses, and then rather than doing setFilteredCourses(courses), do it with initFilteredCourses?
We'd also need a new useEffect in all filter components to call the new function. And maybe do some check in the other useEffect to make sure it doesn't call the function on initial load? 

Made with [next.js](https://nextjs.org/)