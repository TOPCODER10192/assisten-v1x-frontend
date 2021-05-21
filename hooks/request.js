export const request = async(method = 'GET', url = '', data = {}, headers = {}) => {
  try {
    const $method = ['PUT', 'DELETE'].indexOf(method) > -1 ? `_method=${method}` : ''

    let $query = ''
    if (method == 'GET') {
      $query = Object.keys(data).map((name) =>
        Array.isArray(data[name])
        ? `${name}=${encodeURIComponent(data[name].join('|'))}`
        : `${name}=${encodeURIComponent(data[name])}`)
          .join('&')
    }

    const reply = await fetch(`${url}?${$method}${$query}`, {
      method: method!='GET' ? 'POST' : 'GET',
      body: method!='GET' ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    console.log("REQUEST SUCCESS", { method, url, data, headers, reply })
    const res = await reply.json()

    let errorFields = {}
    let messages = []
    if (res.errors) {
      res.errors.map(e => {
        errorFields[e.field] = true
        messages.push(e.message)
      })
    }

    res.errorFields = errorFields
    res.error = messages.join(`\n`)
    return res

  } catch (error) {
    console.log("REQUEST FAILED", { method, url, data, headers, error })
    return { status: false, error, errors: [] }
  }
}

export default request;
