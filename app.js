
//setInterval
function getSetIntervalPolyfill() {
  // closure
  var intervalID = 0;
  var intervalMap = {};

  function customSetInterval(callbackFn, delay = 0, ...args) {

    var id = intervalID++;

    function repeat() {
      intervalMap[id] = setTimeout(
        () => {
          callbackFn(...args)
          // Terminating
          if (intervalMap[id]) {
            repeat();
          }
        }, delay);
    }
    repeat();

    return id

  }

  function customClearInterval(intervalID) {
    clearTimeout(intervalMap[intervalID]);
    delete intervalMap[intervalID];
  }

  return {
    customSetInterval,
    customClearInterval
  }

}

const {
  customSetInterval,
  customClearInterval
} = getSetIntervalPolyfill()

let counter = 0
let intervalID;

function greeting(name) {
  counter++;
  console.log("Hello", name);
  if (counter >= 3) {
    customClearInterval(intervalID)
  }
}

intervalID = customSetInterval(greeting, 2000, "Ankit");

//setTimeout

// function myTimeout(fun, milisecs) {
//   var nowT = Date.now();
//   while (Date.now() < nowT + milisecs) {
//     continue;
//   }
//   fun();
// }
// function consout() {
//   console.log('The future arrived now!');
// }

// myTimeout(consout, 5000);