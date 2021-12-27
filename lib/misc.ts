export const capitalize = (word: string) => word[0].toLocaleUpperCase() + word.substring(1)

export const isDev = () => !process.env.NETLIFY && process.env.NODE_ENV === 'development'
