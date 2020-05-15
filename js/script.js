/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// page scroll indicator

// window.onscroll = function() {
//   pageScroll()
// }

// function pageScroll() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
//   var scrolled = (winScroll / height) * 100
//   document.getElementById('myBar').style.width = scrolled + '%'
// }

// toggleNav

function toggleNav() {
  var x = document.getElementById('myNavBar')
  if (x.className === 'navbar') {
    x.className += ' responsive'
  } else {
    x.className = 'navbar'
  }
}

// about sidebar


// Text rotation

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

  var that = this
  var delta = 200 - Math.random() * 100

  if (this.isDeleting) {
    delta /= 2 
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.loopNum++
    delta = 500
  }

  setTimeout(function() {
    that.tick()
  }, delta)
}

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate')
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate')
    var period = elements[i].getAttribute('data-period')
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period)
    }
  }
  // INJECT CSS
  var css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }'
  document.body.appendChild(css)
}

// smooth scroll

$(document).ready(function(){
  // Add smooth scrolling to all links
  $('a').on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault()

      // Store hash
      var hash = this.hash

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash
      })
    } // End if
  })
})

