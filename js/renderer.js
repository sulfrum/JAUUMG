
    // -------------------------------------------------------
    // Renderer: disegna il Dungeon sul canvas
    // -------------------------------------------------------
    class Renderer {
      constructor(canvas, dungeon, tileSize = 20) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dungeon = dungeon;
        this.tileSize = tileSize;

        this.canvas.width  = dungeon.cols * tileSize;
        this.canvas.height = dungeon.rows * tileSize;

        this.colors = {
          0: '#555566', // pavimento
          1: '#1a1a2e', // muro
        };
      }

      draw() {
        const { ctx, dungeon, tileSize, colors } = this;
        const T = tileSize;

        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let row = 0; row < dungeon.rows; row++) {
          for (let col = 0; col < dungeon.cols; col++) {
            const tile = dungeon.getTile(col, row);
            ctx.fillStyle = colors[tile] ?? '#ff0000';
            ctx.fillRect(col * T + 1, row * T + 1, T - 2, T - 2);
          }
        }
      }
    }
