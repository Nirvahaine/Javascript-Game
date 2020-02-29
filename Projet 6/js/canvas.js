class Canvas {

    constructor(line,column,obstacle, player){
        this.canvas = document.getElementById('tutorial');
        this.cellSize = 900/line;
        this.moveX = 0;
        this.moveY = 0;
        this.lineX = 0;
        this.lineY = 0;
        this.imgX = 0;
        this.imgY = 0;
        this.obstacle = obstacle;
        this.line = line;
        this.column = column;
        this.cells = column*line;
        this.plateau = new Array();
        this.player = player;
        this.width = 900;
        this.height = 900;
    }

    canvasCreate(redraw){
        if (this.canvas.getContext) { 
            //Récupère le contexte du canva
            this.ctx = this.canvas.getContext('2d');

            //Dessin lignes
            this.moveY = this.cellSize;
            this.lineX = 900;
            this.lineY = this.cellSize;

            for(let i=1;i<=this.line;i++)
            { 
                this.ctx.moveTo(this.moveX, this.moveY);
                this.ctx.lineTo(this.lineX, this.lineY);
                this.moveY += this.cellSize;
                this.lineY += this.cellSize;
            }


            if(redraw == false){
                //Dessin colonnes
                this.lineX=0;
                this.moveY=0;

                for(let j=1;j<=this.column;j++)
                {
                    this.ctx.moveTo(this.moveX, this.moveY);
                    this.ctx.lineTo(this.lineX, this.lineY);
                    this.moveX += this.cellSize;
                    this.lineX += this.cellSize;
                }

            }
            if(redraw == false){
                for(let i=0;i<this.cells;i++)
                {
                    this.plateau[i]= new Cell("vide", false, "aucune");
                }
            }

            this.ctx.strokeStyle = "black"
            this.ctx.stroke();

        } 
        else { alert("Votre navigateur est obsolète !");
              // code pour le cas où canvas ne serait pas supporté
             }
    };
}