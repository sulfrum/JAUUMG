
    // -------------------------------------------------------
    // Main
    // -------------------------------------------------------
    

    
    
    function generateDungeon() {
      const cols = getClampedInt('colsInput', 5, 100, 40);
      const rows = getClampedInt('rowsInput', 5, 100, 25);
      const numRooms = getClampedInt('roomsInput', 1, 50, 8);
      const tile = getClampedInt('tileInput', 4, 40, 20);

      const dungeon = new Dungeon(cols, rows);
      const result = dungeon.createRooms(numRooms);
	  //dungeon.connectRooms(result.rooms[0], result.rooms[1]);
      dungeon.connectAllRooms();

      const canvas = document.getElementById('c');
      const renderer = new Renderer(canvas, dungeon, tile);
      renderer.draw();

      document.getElementById('info').textContent =
        `${cols}×${rows} cells | tile ${tile}px | rooms ${result.roomsCreated}/${numRooms} | attemts ${result.attempts}/${result.maxAttempts}`;
    }

    document.getElementById('generateBtn').addEventListener('click', generateDungeon);

    generateDungeon();
