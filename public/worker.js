onmessage = event =>  {
  console.log('event', event.data.message)
  
  // if (event.data) {
  //   console.log("Worker is about to do some work!", event.data)
    
    
    function binaryInsert(x, array) {
      let l = 0,
      r = array.length - 1,
      m;
      while (l <= r) {
        m = (l + r) / 2 | 0;
        if (array[m] > x) {
          r = m - 1;
          continue;
        }
        l = m + 1;
        if (array[m] === x) {
          break; // use return if no duplicates are desired
        }
      }
      array.splice(l, 0, x);
    }

    const arr = []
    const ms = event.data.message
    const limit = 100
    let totalTime = 0

    const t = setInterval(() => {
      if (arr.length === limit) {
        console.log("TotalTime", totalTime, 'seconds')
        self.postMessage({ message: totalTime })
        clearInterval(t)
      }
      const randomNr = Math.floor((Math.random()*limit) + 1)

      const start = performance.now()
      binaryInsert(randomNr, arr)
      const end = performance.now()
      
      console.log(arr.length)
      
      const time = (end - start) / 1000
      totalTime += time
    //   console.log('It took', time, 'seconds')
    }, ms)
  // }
}

onerror = event => {
  console.error(event.message)
}