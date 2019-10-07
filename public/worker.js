const array = []
let limit = 10

onmessage = event =>  {
  if(event.data.limit) {
    limit = event.data.limit
  }

  if (event.data.randomNr) {
    compute() 
  }
    
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

  function compute() {
    let time = 0
    const start = performance.now()
    binaryInsert(event.data.randomNr, array)
    const end = performance.now()
    time = (end - start) / 1000
    console.log(array.length)
    // console.log(array)
    self.postMessage({ time })
    if(array.length === limit) {
      self.postMessage({ message: "complete" })
    }
  }
}