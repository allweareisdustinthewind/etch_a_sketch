let maxCount = 16; // Count of quads
const WIDTH = 720; // Horizontal size of container mit quads
const HEIGHT = 720; // Vertical size of container mit quads
const GAP = 1; // Gap between quads

//
// Get random color from 0 to 255
//
function getRandomColor () {
   return Math.floor (Math.random () * 256);
}

//
// Callback to call by hovering on quad
// 
function onHover (ev) {
   ev.preventDefault ();

   let quad = ev.currentTarget;
   if (quad.background_opacity && quad.background_opacity >= 1.0)
      return;

   // First hovering on quad
   if (!quad.background_opacity) {
      quad.background_color_red   = getRandomColor ();
      quad.background_color_green = getRandomColor ();
      quad.background_color_blue  = getRandomColor ();
      quad.background_opacity = 0.1;
   }
   else // Increase opacity by interaction from 2 to 10
      quad.background_opacity += 0.1;

   quad.style.backgroundColor = `rgba(${quad.background_color_red}, ${quad.background_color_green}, ${quad.background_color_blue}, ${quad.background_opacity})`;
}

//
// Main function to draw a grid of quads
//
function drawGrid () {
   const container = document.querySelector (".container");
   container.style.width = `${WIDTH}px`;
   container.style.height = `${HEIGHT}px`;

   // Calculation of size one's grid
   const size = Math.floor ((WIDTH - (maxCount + 1) * GAP) / maxCount);

   for (let i = 0; i < maxCount; ++i) {
      const row = document.createElement ('div');
      row.classList.add ('container_row');

      for (let j = 0; j < maxCount; ++j) {
         const quad = document.createElement ('div');
         quad.classList.add ('quad');
         quad.style.margin = `${GAP}px`;
         quad.style.width = `${size}px`;
         quad.style.height = `${size}px`;
         quad.addEventListener ('mouseover', onHover);

         row.appendChild (quad);
      }

      container.appendChild (row);
   }
}

//
// Button with callback to change a size of grid 
//
const button = document.querySelector ('button');
button.addEventListener ('click', () => {
   for (;;) {
      maxCount = +prompt ('Enter count of quads (1 - 100):');
      if (maxCount >= 1 && maxCount <= 100)
         break;

      alert ("Count must be in intervall [1, 100]");
   }

   const ar = document.querySelectorAll ('.container_row');
   for (let elem of ar)
      elem.remove ();

   drawGrid ();
});


drawGrid ();