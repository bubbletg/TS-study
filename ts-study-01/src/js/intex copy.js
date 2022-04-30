function parseQueryString(queryString) {
  if (!queryString || !queryString.length) return {}
  const queryObj = {}
  const items = queryString.split('&')
  items.forEach((item) => {
    const [key, value] = item.split('=')
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value)
      } else {
        queryObj[key] = [...queryObj[key], value]
      }
    } else {
      queryObj[key] = value
    }
  })
  return queryObj
}

console.log(parseQueryString('a=1&b=2&c=3&d=4&a=5&b=1'))
