export const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
  const [key, value] = cookie.split('=')
  acc[key] = value
  return acc
}, {})
