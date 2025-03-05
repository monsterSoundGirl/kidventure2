// Make sure you have permissions set in the Miro developer portal
// so that you can read/write to the board.

// Miro's next-gen apps typically rely on 'miro.onReady' or 'miro.initialize'
// but here's a minimal version that should work out-of-the-box:

document.addEventListener('DOMContentLoaded', () => {
  // Grab the button by ID
  const addStickyButton = document.getElementById('addStickyButton');

  // Add a click event to create a sticky note
  addStickyButton.addEventListener('click', async () => {
    try {
      // Use Miro’s board widgets API to create a new sticky note
      const sticky = await miro.board.widgets.create({
        type: 'sticky_note',
        // What the note says
        content: 'Hello from my Miro app!',
        // Adjust the x/y to place it nicely
        x: 0,
        y: 0,
        // The style property can be omitted or adjusted
        style: {
          fillColor: '#FFF9B1', // optional sticky color
        },
      });

      console.log('Sticky note created:', sticky);
    } catch (error) {
      console.error('Error creating sticky note:', error);
    }
  });
});
