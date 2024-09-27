// Function to make any DIV element draggable
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector('.draggable')) {
      elmnt.querySelector('.draggable').onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
  // Function to generate random positions
  function setRandomPosition(elmnt) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Generate random positions, ensuring the element stays within the viewport
    const randomLeft = Math.random() * (viewportWidth - elmnt.offsetWidth);
    const randomTop = Math.random() * (viewportHeight - elmnt.offsetHeight);
  
    elmnt.style.left = randomLeft + "px";
    elmnt.style.top = randomTop + "px";
  }
  
  // Apply the dragElement function to all draggable DIVs
  const divs = [
    document.getElementById("div1"), 
    document.getElementById("div2"), 
    document.getElementById("div3"),
    document.getElementById("div4"), 
    document.getElementById("div5"), 
    document.getElementById("div6"),
    document.getElementById("div7")];
  
  divs.forEach(div => {
    setRandomPosition(div);  // Set random position on load
    dragElement(div);        // Make the div draggable
  });


  // Carousel

  const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

let slideIndex = 0;
let slideWidth = items[0].offsetWidth;
const totalSlides = items.length;

// Function to update the slide width dynamically
function updateSlideWidth() {
  slideWidth = items[0].offsetWidth;  // Update the slide width on each navigation or resize
}

function updateSlidePosition() {
  carousel.scrollTo({
    left: slideIndex * slideWidth,
    behavior: 'smooth',
  });
}

function nextSlide() {
  if (slideIndex < totalSlides - 1) {
    slideIndex++;
  } else {
    slideIndex = 0;
  }
  updateSlideWidth();
  updateSlidePosition();
}

function prevSlide() {
  if (slideIndex > 0) {
    slideIndex--;
  } else {
    slideIndex = totalSlides - 1;
  }
  updateSlideWidth();
  updateSlidePosition();
}

// Update slideIndex when manually scrolling
carousel.addEventListener('scroll', () => {
  updateSlideWidth();  // Always recalculate slide width on scroll
  slideIndex = Math.round(carousel.scrollLeft / slideWidth);
});

// Update slide width on window resize to adapt to changing screen sizes
window.addEventListener('resize', updateSlideWidth);
