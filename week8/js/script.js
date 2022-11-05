// DRAG AND DROP

const dragthings = document.querySelectorAll('.draggable')
const boxes = document.querySelectorAll('.container')

dragthings.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

boxes.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


// function makeVideoOldTimey() {
//     var video = document.getElementById("video1");
//     var canvas = document.getElementById("canvasOverlay");
//     var context = canvas.getContext("2d");

//     video.addEventListener("play", function() { 
//     draw(video,context,canvas);               
//     }, false);  

// }

// function draw(video, context, canvas) {
//     if (video.paused || video.ended) return false;
    
//     drawOneFrame(video, context, canvas);
// }


