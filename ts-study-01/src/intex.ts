/**
 * 将 a=b 字符串 转换成：{a:b}
 */
type ParseParam<Param extends string> = Param extends `${infer key}=${infer value}`
  ? {
      [K in key]: value
    }
  : Record<string, any>
// Record 用于创建索引类型，传入 key 和值的类型：

type MergeValues<OneValue, TwoValue> = OneValue extends TwoValue
  ? OneValue
  : TwoValue extends unknown[]
  ? [OneValue, ...TwoValue]
  : [OneValue, TwoValue]

type MergeParse<OneParse extends Record<string, any>, TwoParse extends Record<string, any>> = {
  readonly [Key in keyof OneParse | keyof TwoParse]: Key extends keyof OneParse
    ? Key extends keyof TwoParse
      ? MergeValues<OneParse[Key], TwoParse[Key]>
      : OneParse[Key]
    : Key extends keyof TwoParse
    ? TwoParse[Key]
    : never
}

type ParseQueryString<T extends string> = T extends `${infer Param}&${infer Rest}` // 提取 Param,和剩下的参数
  ? MergeParse<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<T>

function parseQueryString<Str extends string>(queryString: Str): ParseQueryString<Str> {
  if (!queryString || !queryString.length) return {} as any
  const queryObj = {} as any
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

const query = 'a=1&b=2&c=3&d=4&a=5&b=1&ef=1'

const pqs = parseQueryString(query)
pqs.a
pqs.b
pqs.c
pqs.d
pqs.ef

console.log(pqs.a)
