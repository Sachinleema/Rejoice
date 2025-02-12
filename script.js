function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locoScroll()

function cursorEffect() {
  var page1content = document.querySelector('#page1-content');
  var cursor = document.querySelector("#cursor");

  page1content.addEventListener("mousemove", function (dets) {

    gsap.to(cursor, {
      x: dets.x,
      y: dets.y
    })
  })


  page1content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1
    })
  })
  page1content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0
    })
  })
}
cursorEffect()

function page2Animation() {
  gsap.from("#page2-header, #page2-content", {
    y: 60,
    opacity: 3,
    delay: 0.5,
    stagger: 0.5,
    scrollTrigger: {
      trigger: "#page2-header, #page2-content",
      scroller: ".main",
      start: "top 80%",
      end: "top 85%",
      scrub: 2
    }

  })
}
page2Animation()




function loaderAnimation() {
  var tl = gsap.timeline()
  tl.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
  })
  tl.to("#loader h3", {
    opacity: 0,
    x: -10,
    stagger: 0.1,
    duration: 1
  })
  tl.to("#loader", {
    opacity: 0,
    display: "none"
  })

}
loaderAnimation()

function headerAnim() {
  gsap.from("#page1-content h1 span", {
    y: 100,
    duration: 0.5,
    delay: 3,
    stagger: 0.1
  })
}
headerAnim()

function menuBtnClick() {
  var full = document.querySelector("#full-scr");
  var menuBtn = document.querySelector("nav h4");
  var xbtn = document.querySelector("#white-scr #header h1");

  let isOpen = false;

  menuBtn.addEventListener("click", function () {
    if (!isOpen) {
      full.style.top = "0";
      isOpen = true;
    } else {
      full.style.top = "-200%";
      isOpen = false;
    }
  });

  xbtn.addEventListener("click", function () {
    full.style.top = "-100%";
    isOpen = false;
  });
}

menuBtnClick();


function navCursoranimation() {

  var menubtn = document.querySelector("nav h4");
  var logobtn = document.querySelector("nav h3");
  var cursorText = document.querySelector("#cursor h5");


  menubtn.addEventListener("mouseenter", function () {
    cursorText.style.opacity = 0;
    cursorText.style.display = "none";
    cursor.style.border = "2px solid white";
    cursor.style.height = "7vw"
    cursor.style.width = "7vw"

  })
  menubtn.addEventListener("mouseleave", function () {
    cursorText.style.opacity = 1;
    cursorText.style.display = "block";
    cursor.style.border = "none";
    cursor.style.height = "6vw"
    cursor.style.width = "6vw"
  })

  logobtn.addEventListener("mouseenter", function () {
    cursorText.style.display = "none";
    cursor.style.border = "2px solid white";
    cursor.style.height = "7vw"
    cursor.style.width = "7vw"

  })
  logobtn.addEventListener("mouseleave", function () {
    cursorText.style.display = "block";
    cursor.style.border = "none";
    cursor.style.height = "6vw"
    cursor.style.width = "6vw"
  })
}
navCursoranimation() 