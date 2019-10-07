let worker
let totalTime = 0
let miliseconds = 100
let limit = 10

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
      if (event.data.totalTime) {
        console.log("TotalTime", event.data.totalTime, 'seconds')
        document.getElementById("totalTime").innerHTML = event.data.totalTime + "   seconds"
        document.getElementById("onClick").style = "visibility:visible"
        document.getElementById("textInput").style = "visibility:visible"
        document.getElementById("loadingText").style = "visibility:hidden"
        clearInterval(t)
        worker.terminate()
      }
    }
  }
}