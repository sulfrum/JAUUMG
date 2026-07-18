
    // -------------------------------------------------------
    // Room: struttura dati delle singole stanze
    // -------------------------------------------------------
    class Room  {
      constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
      }
      
	  center() {
	    return {
		  x: Math.floor(this.x + this.w / 2),
		  y: Math.floor(this.y + this.h / 2)
	    };
      }	  
	  
      intersects( otherRoom ){
        return (
           this.x < otherRoom.x + otherRoom.w +1 &&
           this.x + this.w +1 > otherRoom.x &&
           this.y < otherRoom.y + otherRoom.h +1 &&
           this.y + this.h +1 > otherRoom.y
        );
      }
      
    }
