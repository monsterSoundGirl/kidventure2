// script.js

// This function will run when Miro's SDK has loaded
window.onload = async () => {
  // Optional: Wait for Miro to be 'ready' if you need the SDK
  await miro.onReady(() => {
    console.log('Kidventure TTRPG App is loaded in Miro!');
  });

  // Simple example: create a button in your page
  const button = document.createElement('button');
  button.innerText = 'Create a Sticky Note';
  button.onclick = createStickyNote;
  document.body.appendChild(button);
};

async function createStickyNote() {
  // When pressed, create a sticky note at coordinates (0, 0)
  // inside the current Miro board.
  try {
    const sticky = await miro.board.widgets.create({
      type: 'sticky_note',
      x: 0,
      y: 0,
      text: 'Hello from Kidventure!',
      style: {
        stickerBackgroundColor: '#F9DF74'
      }
    });
    console.log('Created sticky note:', sticky);
  } catch (err) {
    console.error('Could not create sticky note', err);
  }
}
