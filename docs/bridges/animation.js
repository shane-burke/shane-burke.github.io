// animation globals
const starting_value = 0;          // Counter start value.
window.counter_total = 167408645;  // Counter end value.
window.increment_max = 9123456;    // Counter MAX increment
window.change_rate_ms = 50;        // Counter MAX change rate (in ms)


let el_name = "#counter"
// Find text element on the HTML page
let span = $(el_name);
// Set text to the starting value.
span.text(starting_value);

let counter_value = parseInt(span.text().trim());


// Counts the number of times the counter has come into
// view on the page
let observed = false;

const myObserver = new IntersectionObserver(elements => {
  if (elements[0].intersectionRatio !== 0) {
    // Start animation only on the first time it comes into view
    if (!observed) updateText(span, counter_value);
    // Turn observed to true
    observed = true
  } 
})

const myEl = document.querySelector(el_name);

myObserver.observe(myEl);

var format = d3.format(",");

// Function that runs the animation
function updateText(el, current_value) {
    // We scale both the increment value and the rate of change based on
    // the fraction of the animation that is completed. In other words, 
    // this is slower at the start and speeds up to the end.
    let fraction_completed = 1 - (current_value / window.counter_total);
    let timer = Math.ceil(window.change_rate_ms * fraction_completed)
    let increment = 1 + Math.ceil(window.increment_max * fraction_completed)

    setTimeout(function() {
        let new_value = current_value + increment;

        // Clamp to max value to make sure final value is exact.
        if (new_value > window.counter_total) {
            new_value = window.counter_total;
        }
        // Update text on page.
        el.text(new_value);

        // If we haven't reached the end, schedule a new frame of the animation.
        if (new_value < window.counter_total) {
            updateText(el, new_value);
        }
    }, timer);
}