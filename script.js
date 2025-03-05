// script.js

window.onload = async () => {
  // Initialize the Miro SDK
  await miro.board.ui.on('icon:click', async () => {
    // This function will be called when your app icon is clicked in the toolbar
    await miro.board.createStickyNote({
      content: 'Hello from Kidventure v2!',
      x: 0, // Center of the viewport
      y: 0, // Center of the viewport
      width: 200,
      style: {
        fillColor: '#fff9b1', // Yellow sticky note
      },
    });
    
    console.log('Created a sticky note on the board!');
  });
  
  // Register your app to show up in Miro's toolbar
  await miro.board.ui.on('drop', async (event) => {
    // Handle drag and drop capability
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
  });
  
  // Register the app with toolbar icon and capabilities
  await miro.board.ui.initialize({
    // Register your interaction capabilities
    capabilities: {
      // Adds a toolbar button
      tooltip: {
        text: 'Kidventure', // Text shown on hover
        iconShape: 'round',
      },
      draggable: {
        enabled: true,
      },
    },
  });
  
  console.log('Kidventure app is initialized and registered with Miro!');
  
  // The button in your app iframe still works as before
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
    await miro.board.createStickyNote({
      content: 'Created from Kidventure iframe button!',
      x: 0,
      y: 0,
      width: 200,
    });
  };
  
  document.body.appendChild(button);
};
