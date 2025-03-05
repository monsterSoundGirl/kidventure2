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

// Main initialization function
async function initializeApp() {
  try {
    updateStatus('Script loaded, initializing Miro SDK...');
    
    // Initialize the Miro SDK
    await miro.board.ui.on('icon:click', async () => {
      try {
        updateStatus('Creating sticky note from toolbar click...');
        await miro.board.createStickyNote({
          content: 'Hello from Kidventure v2!',
          x: 0,
          y: 0,
          width: 200,
          style: {
            fillColor: '#fff9b1',
          },
        });
        updateStatus('Successfully created a sticky note on the board!');
      } catch (err) {
        updateStatus('Error creating sticky note from toolbar: ' + err.message, true);
      }
    });
    
    // Register drop capability
    await miro.board.ui.on('drop', async (event) => {
      try {
        const { x, y } = event;
        await miro.board.createStickyNote({
          content: 'Dropped from Kidventure v2!',
          x,
          y,
          width: 200,
          style: {
            fillColor: '#d3f8e2',
          },
        });
        updateStatus('Created sticky note from drop event');
      } catch (err) {
        updateStatus('Error handling drop event: ' + err.message, true);
      }
    });
    
    // Register the app
    await miro.board.ui.initialize({
      capabilities: {
        tooltip: {
          text: 'Kidventure',
          iconShape: 'round',
        },
        draggable: {
          enabled: true,
        },
      },
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

// Also add this as a fallback in case window.onload doesn't trigger properly
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded event fired');
});

console.log('Script.js has finished loading');
