const moment = require('moment')
module.exports =  {
  countDown: () => {
    const eventTime= 1366549200
    const currentTime = 1366547400
    const diffTime = eventTime - currentTime;
    const duration = moment.duration(diffTime*1000, 'milliseconds');
    const interval = 1000;
    const time = {}
    setInterval(function(){
      duration = moment.duration(duration - interval, 'milliseconds');
      time.duration = duration
    }, interval)
    return time
  }
}