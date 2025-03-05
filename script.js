// script.js

window.onload = async () => {
  // The new Miro Web SDK still uses 'miro.onReady' in v2:
  await miro.onReady(() => {
    console.log('Kidventure app is loaded inside Miro!');

    // Create a button in your webpage
    const button = document.createElement('button');
    button.innerText = 'Create Sticky Note';
    button.onclick = async () => {
      await miro.board.createStickyNote({
        content: 'Hello from Kidventure v2!',
        x: 0,
        y: 0,
      });
    };
    document.body.appendChild(button);
  });
};
