// script.js
console.log('Script.js has started loading');

// Function to update status message
function updateStatus(message, isError = false) {
  const statusEl = document.getElementById('status-message');
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
  }
  console.log(message);
}

// Check if running inside Miro
function isRunningInsideMiro() {
  return window.miro !== undefined;
}

// Main initialization function
async function initializeApp() {
  try {
    // Check if we're running inside Miro
    if (!isRunningInsideMiro()) {
      updateStatus('This app is currently running standalone (outside Miro). The Miro SDK functions will not work here.', true);
      
      // Create a dummy button for standalone mode
      const button = document.createElement('button');
      button.innerText = 'Create Sticky Note (Demo Only)';
      button.style.padding = '10px';
      button.style.margin = '10px';
      button.style.backgroundColor = '#4262ff';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      
      button.onclick = () => {
        updateStatus('This button would create a sticky note if running inside Miro.', true);
        alert('This app needs to run inside Miro to create sticky notes. To test this app, install it in Miro using the Developer Console.');
      };
      
      const container = document.getElementById('button-container');
      if (container) {
        container.appendChild(button);
        updateStatus('Demo button added. This app must be run inside Miro to use actual SDK features.');
      }
      
      return; // Exit early, don't try to initialize Miro SDK
    }
    
    // If we get here, we're running inside Miro
    updateStatus('Script loaded, initializing Miro SDK...');
    
    // Initialize the Miro SDK - USING THE RIGHT INITIALIZATION PATTERN
    await miro.board.ui.initialize({
      toolbar: {
        // Adding toolbar buttons explicitly
        items: [
          {
            // Icon button in toolbar
            tooltip: 'Add Sticky',
            svgIcon: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#4262ff"/><text x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle">K</text></svg>',
            onClick: async () => {
              // This function is called when the toolbar button is clicked
              await miro.board.createStickyNote({
                content: 'Hello from Kidventure v2!',
                x: 0, // Center of the viewport
                y: 0, // Center of the viewport
                width: 200,
                style: {
                  fillColor: '#fff9b1', // Yellow sticky note
                },
              });
              updateStatus('Created a sticky note on the board!');
            },
          },
        ],
      },
    });
    
    // Register drag and drop capability
    miro.board.ui.on('drop', async (event) => {
      try {
        const { x, y } = event;
        await miro.board.createStickyNote({
          content: 'Dropped from Kidventure v2!',
          x,
          y,
          width: 200,
          style: {
            fillColor: '#d3f8e2', // Light green sticky note
          },
        });
        updateStatus('Created sticky note from drop event');
      } catch (err) {
        updateStatus('Error handling drop event: ' + err.message, true);
      }
    });
    
    updateStatus('Miro SDK initialized successfully!');
    
    // Create the button in your app iframe
    const button = document.createElement('button');
    button.innerText = 'Create Sticky Note';
    button.style.padding = '10px';
    button.style.margin = '10px';
    button.style.backgroundColor = '#4262ff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    
    button.onclick = async () => {
      try {
        updateStatus('Creating sticky note from button click...');
        await miro.board.createStickyNote({
          content: 'Created from Kidventure iframe button!',
          x: 0,
          y: 0,
          width: 200,
        });
        updateStatus('Sticky note created successfully!');
      } catch (err) {
        updateStatus('Error creating sticky note: ' + err.message, true);
      }
    };
    
    // Add the button to a specific container rather than the body
    const container = document.getElementById('button-container');
    if (container) {
      container.appendChild(button);
      updateStatus('Button created and added to page.');
    } else {
      updateStatus('Error: Button container not found!', true);
    }
    
  } catch (err) {
    updateStatus('Error initializing app: ' + err.message, true);
    console.error('Initialization error:', err);
  }
}

// Ensure the DOM is fully loaded before running our code
window.onload = () => {
  console.log('Window loaded, executing initialization');
  // Wrap in try-catch to catch any immediate errors
  try {
    initializeApp();
  } catch (err) {
    console.error('Fatal error during initialization:', err);
    const statusEl = document.getElementById('status-message');
    if (statusEl) {
      statusEl.textContent = 'Fatal error: ' + err.message;
      statusEl.style.backgroundColor = '#f8d7da';
    }
  }
};

console.log('Script.js has finished loading');
