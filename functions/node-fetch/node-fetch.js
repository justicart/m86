const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  const key = event.queryStringParameters.key || '';
  const MonitoringRef = event.queryStringParameters.MonitoringRef || '';
  try {
    const response = await fetch(`https://bustime.mta.info/api/siri/stop-monitoring.json?key=${key}&MonitoringRef=${MonitoringRef}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({err}), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
