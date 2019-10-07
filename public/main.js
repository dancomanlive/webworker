let worker
let totalTime = 0
let miliseconds = 1
let limit = 100000

function startCompute() {

  if (window.Worker) {
    worker = new Worker('worker.js')
    worker.postMessage({ limit })

    if (document.getElementById("textInput").value) {
      miliseconds = document.getElementById("textInput").value
    }
    document.getElementById("textInput").style = "visibility:hidden"
    document.getElementById("loadingText").style = "visibility:visible"
    document.getElementById("onClick").style = "visibility:hidden"

    const t = setInterval(() => {
      const randomNr = Math.floor((Math.random()*limit) + 1)
      worker.postMessage({ randomNr })
    }, miliseconds)
    
    worker.onmessage = event => {
      if (event.data.message === "complete") {
        console.log("TotalTime", totalTime, 'seconds')
        document.getElementById("totalTime").innerHTML = totalTime + "   seconds"
        document.getElementById("onClick").style = "visibility:visible"
        document.getElementById("textInput").style = "visibility:visible"
        document.getElementById("loadingText").style = "visibility:hidden"
        clearInterval(t)
        worker.terminate()
      } else if (event.data.time) {
        const { time } = event.data
        totalTime += time
      }
    }
  }
}