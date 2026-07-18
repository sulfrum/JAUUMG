    // -------------------------------------------------------
    // Dungeon: struttura dati della mappa
    // -------------------------------------------------------
    
    class Dungeon {
      constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.grid = Array.from({ length: rows }, () => new Array(cols).fill(1));
        this.rooms = []
      }

      setTile(x, y, value) {
        if (this.inBounds(x, y)) this.grid[y][x] = value;
      }

      getTile(x, y) {
        if (!this.inBounds(x, y)) return 1; // fuori bounds = muro
        return this.grid[y][x];
      }

      inBounds(x, y) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
      }

      // scava un rettangolo di pavimento
      carveRect(x, y, w, h) {
        for (let row = y; row < y + h; row++) {
          for (let col = x; col < x + w; col++) {
            this.setTile(col, row, 0);
          }
        }
      }
 
      carveHorizontalCorridor(x1, x2, y) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);

        for (let x = start; x <= end; x++) {
          this.setTile(x, y, 0);
        }
      }

      carveVerticalCorridor(y1, y2, x) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);

        for (let y = start; y <= end; y++) {
          this.setTile(x, y, 0);
        }
	  }

       

      createRooms(num) {
        const minW = 2;
        
        const maxW = Math.floor(this.cols / 2);
        const minH = 2;
        const maxH = Math.floor(this.rows / 2);

        const maxAttempts = num * 20;
        let attempts = 0;

        while (this.rooms.length < num && attempts < maxAttempts) {
          attempts++;

          const w = getRandomInt(minW, maxW + 1);
          const h = getRandomInt(minH, maxH + 1);

          const x = getRandomInt(1, this.cols - w);
          const y = getRandomInt(1, this.rows - h);

          const newRoom = new Room(x, y, w, h);

          let overlaps = false;

          for (const room of this.rooms) {
            if (newRoom.intersects(room)) {
              overlaps = true;
              break;
            }
          }

          if (!overlaps) {
            this.rooms.push(newRoom);
            this.carveRect(newRoom.x, newRoom.y, newRoom.w, newRoom.h);
          }
        } 

		
		
        return {
          roomsCreated: this.rooms.length,
          attempts: attempts,
          maxAttempts: maxAttempts,
          rooms: this.rooms
        };
    }
	
	connectRoomsLD(roomA, roomB) {
			const centerA = roomA.center();
			const centerB = roomB.center();
			
			
			this.carveHorizontalCorridor(centerA.x, centerB.x, centerA.y);
			this.carveVerticalCorridor(centerA.y, centerB.y, centerB.x);
		}

	connectRoomsDL(roomA, roomB) {
			const centerA = roomA.center();
			const centerB = roomB.center();
			
			this.carveVerticalCorridor(centerA.y, centerB.y, centerA.x);
			this.carveHorizontalCorridor(centerA.x, centerB.x, centerB.y);
		}
	
	connectAllRooms() {
	  const sortedRooms = [...this.rooms].sort((a, b) => a.x - b.x);

	  for (let i = 0; i < sortedRooms.length - 1; i++) {
		const useLD = getRandomInt(0,2) === 0;
		if (useLD) {
          this.connectRoomsLD(sortedRooms[i], sortedRooms[i + 1]);
		} else {
		  this.connectRoomsDL(sortedRooms[i], sortedRooms[i + 1]);
		}
	  }
	}	
	
	}

