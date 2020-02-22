let COLORWHITE = "white";
let COLORBLACK = "black";
let piecesHtml = []; //array contains html pieces
let casesHtml = []; //array contains html cases
let pieces = []; //javascript piece object array
let sizeOfCase = 0;
let actualPlayer = null;
let playerWhite = null;
let playerBlack = null;
let time = 0;
let timer = null;
let pawnClickedXY = [];
let game = null;
let languageFile = null;

class Player{
    constructor(color){
        this.color = color;
    }
}

class Move{
    constructor(x, y, eatable, enabled = true){
        this.x = x;
        this.y = y;
        this.enabled = enabled;
        this.eatable = eatable;
        this.previousMove = null
    };
    setPreviousMove(move){
        this.previousMove = move;
    }
    enable(){
        this.enabled = true;
    }
    disable(){
        this.enabled = false;
    }
}

class Piece{
    constructor(color, x, y){
        this.color = color;
        this.turn = 0;
        this.x = x;
        this.y = y;
        this.movements = []
    };
    incrementTurn(){
        this.turn++;
    };
    addMovement(move){
        this.movements.push(move)
    };
    getMovement(x, y){
        for(let i=0; i<this.movements.length; i++){
            if(this.movements[i].x === x && this.movements[i].y === y)
                return this.movements[i];
        }
        return null;
    };
    buildMovements(){
        this.movements = [];
    };
    canMove(){
        for(let i=0; i<this.movements.length; i++)
            if(this.movements[i].enabled)
                return true;
        return false;
    }
}

class Bishop extends Piece{
    constructor(color, x, y){
        super(color, x, y);
    };
    buildMovements(x, y){
        super.buildMovements();
        let enabled = true;
        let previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x+i, y+i)){
                if(isSamePieceOnCase(this, x+i, y+i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x+i, y+i)){
                    this.addMovement( m = new Move(x+i, y+i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x+i, y+i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }

        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x+i, y-i)){
                if(isSamePieceOnCase(this, x+i, y-i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x+i, y-i)){
                    this.addMovement(m = new Move(x+i, y-i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x+i, y-i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }

        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x-i, y-i)){
                if(isSamePieceOnCase(this, x-i, y-i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x-i, y-i)){
                    this.addMovement(m = new Move(x-i, y-i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x-i, y-i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x-i, y+i)){
                if(isSamePieceOnCase(this, x-i, y+i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x-i, y+i)){
                    this.addMovement(m = new Move(x-i, y+i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x-i, y+i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
    }
}

class Knight extends Piece{
    constructor(color, x, y){
        super(color, x, y);
    };
    buildMovements(x, y){
        super.buildMovements();
        for(let i = -2; i <= 2; i++){
            for(let j = -2; j <= 2; j++){
                if( (Math.abs(i) === 2 && Math.abs(j) === 1) || (Math.abs(i) === 1 && Math.abs(j) === 2) ){
                    if(checkIfCaseIsOnBoard(x+i, y+j)){
                        this.addMovement(new Move(x+i, y+j, isAnEnemyPieceOnCase(this, x+i, y+j), !isSamePieceOnCase(this, x+i, y+j)))
                    }
                }
            }
        }
    }
}

class Rook extends Piece{
    constructor(color, x, y){
        super(color, x, y);
    };
    buildMovements(x, y){
        super.buildMovements();
        let enabled = true;
        let previousMove = new Move(x, y, false, false);
        for(let i=y-1; i>=0; i--){
            if(isSamePieceOnCase(this, x, i)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, x, i)){
                this.addMovement(m = new Move(x, i, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(x, i, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=y+1; i<=7; i++){
            if(isSamePieceOnCase(this, x, i)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, x, i)){
                this.addMovement(m = new Move(x, i, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(x, i, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=x+1; i<=7; i++){
            if(isSamePieceOnCase(this, i, y)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, i, y)){
                this.addMovement(m = new Move(i, y, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(i, y, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=x-1; i>=0; i--){
            if(isSamePieceOnCase(this, i, y)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, i, y)){
                this.addMovement(m = new Move(i, y, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(i, y, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
    }
}

class Queen extends Piece{
    constructor(color, x, y){
        super(color, x, y);
    };
    buildMovements(x, y){
        super.buildMovements();
        let enabled = true;
        let previousMove = new Move(x, y, false, false);
        for(let i=y-1; i>=0; i--){
            if(isSamePieceOnCase(this, x, i)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, x, i)){
                this.addMovement(m = new Move(x, i, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(x, i, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=y+1; i<=7; i++){
            if(isSamePieceOnCase(this, x, i)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, x, i)){
                this.addMovement(m = new Move(x, i, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(x, i, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=x+1; i<=7; i++){
            if(isSamePieceOnCase(this, i, y)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, i, y)){
                this.addMovement(m = new Move(i, y, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(i, y, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=x-1; i>=0; i--){
            if(isSamePieceOnCase(this, i, y)){
                enabled = false;
            }
            let m;
            if(isAnEnemyPieceOnCase(this, i, y)){
                this.addMovement(m = new Move(i, y, true, enabled));
                enabled = false;
            }else{
                this.addMovement(m = new Move(i, y, false, enabled));
            }
            m.setPreviousMove(previousMove);
            previousMove = m;
        }

        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x+i, y+i)){
                if(isSamePieceOnCase(this, x+i, y+i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x+i, y+i)){
                    this.addMovement( m = new Move(x+i, y+i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x+i, y+i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x+i, y-i)){
                if(isSamePieceOnCase(this, x+i, y-i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x+i, y-i)){
                    this.addMovement( m = new Move(x+i, y-i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x+i, y-i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x-i, y-i)){
                if(isSamePieceOnCase(this, x-i, y-i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x-i, y-i)){
                    this.addMovement( m = new Move(x-i, y-i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x-i, y-i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
        enabled = true;
        previousMove = new Move(x, y, false, false);
        for(let i=1; i<8; i++){
            if(checkIfCaseIsOnBoard(x-i, y+i)){
                if(isSamePieceOnCase(this, x-i, y+i)) {
                    enabled = false;
                }
                let m;
                if(isAnEnemyPieceOnCase(this, x-i, y+i)){
                    this.addMovement( m = new Move(x-i, y+i, true, enabled));
                    enabled = false;
                }else{
                    this.addMovement(m = new Move(x-i, y+i, false, enabled));
                }
                m.setPreviousMove(previousMove);
                previousMove = m;
            }
        }
    }
}

class Pawn extends Piece{
    constructor(color, x, y){
        super(color, x, y);
        this.panwMoveTwoCase = false;
    };
    setPawnMoveTwoCase(boolean){
        this.panwMoveTwoCase = boolean;
    };
    buildMovements(x, y){
        super.buildMovements();
        let increment = 1;
        if(this.color === COLORWHITE)
            increment = -1;

        if(checkIfCaseIsOnBoard(x, y+increment) && !isSamePieceOnCase(this, x, y+increment) && !isAnEnemyPieceOnCase(this, x, y+increment)){
            this.addMovement(new Move(x, y+increment, false));
        }
        if(checkIfCaseIsOnBoard(x-1, y+increment) && isAnEnemyPieceOnCase(this, x-1, y+increment)){
            this.addMovement(new Move(x-1, y+increment, true));
        }
        if(checkIfCaseIsOnBoard(x+1, y+increment) && isAnEnemyPieceOnCase(this, x+1, y+increment)){
            this.addMovement(new Move(x+1, y+increment, true));
        }
        if(checkIfCaseIsOnBoard(x+1, y+increment) && isAnEnemyPieceOnCase(this, x+1, y) && pieces[x+1][y].panwMoveTwoCase){
            this.addMovement(new Move(x+1, y+increment, true));
        }
        if(checkIfCaseIsOnBoard(x-1, y+increment) && isAnEnemyPieceOnCase(this, x-1, y) && pieces[x-1][y].panwMoveTwoCase){
            this.addMovement(new Move(x-1, y+increment, true));
        }

        if(this.turn === 0){
            if(checkIfCaseIsOnBoard(x, y+increment*2) && !isSamePieceOnCase(this, x, y+increment) && !isSamePieceOnCase(this, x, y+increment*2) && !isAnEnemyPieceOnCase(this, x, y+increment) && !isAnEnemyPieceOnCase(this, x, y+increment*2)  && !isAnEnemyPieceOnCase(this, x, y+increment*2))
                this.addMovement(new Move(x, y+increment*2, false));
        }
    }
}

class King extends Piece{
    constructor(color, x, y){
        super(color, x, y);
        this.hasBeenInCheck = false;
        this.piecesChecking = [];
    };
    setHasBeenInCheck(){
        this.hasBeenInCheck = true;
    };
    addPieceChecking(piece){
        this.setHasBeenInCheck();
        this.piecesChecking.push(piece);
    };
    clearPiecesChecking(){
        this.piecesChecking = [];
    };
    buildMovements(x, y){
        super.buildMovements();
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(!(i === 0 && j === 0)){
                    let enabled = true;
                    if(checkIfCaseIsOnBoard(x+i, y+j)){
                        if(isSamePieceOnCase(this, x+i, y+j)){
                            enabled = false;
                        }
                        this.addMovement(new Move(x+i, y+j, isAnEnemyPieceOnCase(this, x+i, y+j), enabled));
                    }
                }
            }
        }
        if(this.turn === 0 && !this.hasBeenInCheck && this.piecesChecking.length === 0){
            let i;
            let canMove = true;
            for(i=1;i<4;i++){
                if(isSamePieceOnCase(this, x-i, y) || isAnEnemyPieceOnCase(this, x-i, y)){
                    canMove = false;
                    break;
                }
            }
            if(canMove && pieces[x-4][y] !== null && pieces[x-4][y].color === this.color && pieces[x-4][y].turn === 0){
                this.addMovement(new Move(x-2, y, false))
            }

            canMove = true;
            for(i=1;i<3;i++){
                if(isSamePieceOnCase(this, x+i, y) || isAnEnemyPieceOnCase(this, x+i, y)){
                    canMove = false;
                    break;
                }
            }
            if(canMove && pieces[x+3][y] !== null && pieces[x+3][y].color === this.color && pieces[x+3][y].turn === 0){
                this.addMovement(new Move(x+2, y, false))
            }
        }
    }
}

(function(){
    loadLanguage();
})();

function initGame(){
    game = document.getElementById("game");
    //the pieces displayed on board
    let gamePiecesHtml = document.getElementById("gamePieces");

    //creating board
    for(let i=0;i<8;i++){
        piecesHtml[i] = [];
        pieces[i] = [];
        casesHtml[i] = [];
        for(let j=0;j<8;j++){
            piecesHtml[i][j] = null;
            pieces[i][j] = null;
            casesHtml[i][j] = null;
        }
    }

    //placing cases and pieces except panws on board
    let pieceHtml;
    let piece;
    let actualColor = COLORBLACK;
    for(let y=0;y<8;y++){
        let line = document.createElement("div");
        line.classList.add("line");
        for(let x=0;x<8;x++){
            if(y <= 1)
                actualColor = COLORBLACK;
            else if(y >= 6)
                actualColor = COLORWHITE;

            let aCase = document.createElement("div");
            aCase.classList.add("case");
            aCase.positionX = x;
            aCase.positionY = y;

            if((x+y)%2 === 0)
                aCase.classList.add("backgroundWhite");
            else
                aCase.classList.add("backgroundBlack");

            if(y === 1 || y === 6){
                pieceHtml = document.createElement("div");
                pieceHtml.classList.add("piece");
                piece = new Pawn(actualColor, x, y);
                if(actualColor === COLORBLACK)
                    pieceHtml.classList.add("pawnBlack");
                else
                    pieceHtml.classList.add("pawnWhite");
                pieces[x][y] = piece;
                piecesHtml[x][y] = pieceHtml;
                gamePiecesHtml.appendChild(pieceHtml);
            }
            if(y===0 || y === 7){
                pieceHtml = document.createElement("div");
                pieceHtml.classList.add("piece");
                if(x===0 || x===7){
                    piece = new Rook(actualColor, x, y);
                    if(actualColor === COLORBLACK)
                        pieceHtml.classList.add("rookBlack");
                    else
                        pieceHtml.classList.add("rookWhite");
                }else if(x===1 || x===6){
                    piece = new Knight(actualColor, x, y);
                    if(actualColor === COLORBLACK)
                        pieceHtml.classList.add("knightBlack");
                    else
                        pieceHtml.classList.add("knightWhite");
                }else if(x===2 || x===5){
                    piece = new Bishop(actualColor, x, y);
                    if(actualColor === COLORBLACK)
                        pieceHtml.classList.add("bishopBlack");
                    else
                        pieceHtml.classList.add("bishopWhite");
                }else if(x===3){
                    piece = new Queen(actualColor, x, y);
                    if(actualColor === COLORBLACK)
                        pieceHtml.classList.add("queenBlack");
                    else
                        pieceHtml.classList.add("queenWhite");
                }else if(x===4){
                    piece = new King(actualColor, x, y);
                    if(actualColor === COLORBLACK)
                        pieceHtml.classList.add("kingBlack");
                    else
                        pieceHtml.classList.add("kingWhite");
                }
                pieces[x][y] = piece;
                piecesHtml[x][y] = pieceHtml;
                gamePiecesHtml.appendChild(pieceHtml);

            }
            casesHtml[x][y] = aCase;
            line.appendChild(aCase);
        }
        game.appendChild(line);
    }

    playerWhite = new Player(COLORWHITE);
    playerBlack = new Player(COLORBLACK);

    window.addEventListener("resize", function(){
        setSize();
    });
    setSize();
    //begin timer
    timer = setInterval(function(){
        time += 1;
    }, 1000);
    actualPlayer = playerWhite;
    displayActualPlayer();
    play();
}

function play(){
    for(let x=0;x<8;x++){
        for(let y=0;y<8;y++){
            let piece = pieces[x][y];
            if(piece != null){
                piece.buildMovements(x, y);
            }
            if(piece !== null && piece.color === actualPlayer.color){
                if(piece instanceof Pawn)
                    piece.setPawnMoveTwoCase(false);
                if(piece.canMove())
                    addClickOnPiece(x, y);
            }
        }
    }
    enableEveryMovement();
    let king = setKingInCheck();
    disableIllegalMovements(king);
    checkIfEndGame(king);
}

function checkIfEndGame(king){
    if(king !== null) {
        let canMove = false;
        for(let x=0;x<8;x++) {
            for (let y = 0; y < 8; y++) {
                let piece = pieces[x][y];
                if(piece !== null && piece.color === actualPlayer.color){
                    piece.movements.forEach(function(move){
                        if(move.enabled) {
                            canMove = true;
                        }
                    });

                }
            }
        }
        if(canMove) {
            if (king.piecesChecking.length !== 0) {
                displayTextAnimation(languageFile["KING_IN_CHECK"]);
            }
        }else
            endGame();
    }
}

function enableEveryMovement(){
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let piece = pieces[x][y];
            if(piece !== null && piece.color === actualPlayer.color){
                if(piece instanceof King)
                    piece.clearPiecesChecking();
            }
        }
    }
}

function disableIllegalMovements(king){
    if(king.piecesChecking.length !== 0) {
        let movesChecking = [];
        king.piecesChecking.forEach(function(e){
           e.movements.forEach(function(f){
                if(f.x === king.x && f.y === king.y){
                    let previous = f;
                    while((previous = previous.previousMove) !== null && previous.enabled === true){
                        movesChecking.push([previous.x, previous.y]);
                    }
                }
           });
        });
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let piece = pieces[x][y];
                if (piece !== null && piece.color === actualPlayer.color) {
                    piece.movements.forEach(function(e){
                        if(piece instanceof King){
                            if(doesArrayIncludeCoordsArray(movesChecking,[e.x, e.y]))
                                e.disable();
                        }
                        else if(!doesArrayIncludeCoordsArray(movesChecking,[e.x, e.y])){
                            if(isAnEnemyPieceOnCase(piece, e.x, e.y)){
                                king.piecesChecking.forEach(function(p){
                                    if(! (p.x === e.x && p.y === e.y) ){
                                        e.disable();
                                    }
                                });
                            }
                            else {
                                e.disable();
                            }
                        }
                    });
                    if(!piece.canMove()){
                        piecesHtml[x][y].removeEventListener("click", clickOnPieceEvent);
                        piecesHtml[x][y].classList.remove("cursorPointer");
                    }
                }
            }
        }
    }else{
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let piece = pieces[x][y];
                if(piece !== null && piece.color !== actualPlayer.color){
                    piece.movements.forEach(function(move){
                        if(move.x === king.x && move.y === king.y) {
                            move = move.previousMove;
                            let moves = [];
                            let piecesOnTrajectory = [];
                            let enemyPiecesOnTrajectory = [];
                            while(move !== null){
                                moves.push(move);
                                let pieceToTest = pieces[move.x][move.y];
                                if(pieceToTest !== null && pieceToTest.color === actualPlayer.color){
                                    piecesOnTrajectory.push(pieceToTest);
                                }else if(pieceToTest !== null && pieceToTest.color !== actualPlayer.color){
                                    enemyPiecesOnTrajectory.push(pieceToTest);
                                }
                                move = move.previousMove;
                            }
                            if(enemyPiecesOnTrajectory.length === 1 && piecesOnTrajectory.length === 1){
                                piecesOnTrajectory[0].movements.forEach(function(moveToTest){
                                    moveToTest.disable();
                                    moves.forEach(function(moveToTest2){
                                        if(moveToTest.x === moveToTest2.x && moveToTest.y === moveToTest2.y) {
                                            moveToTest.enable();
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            }
        }
    }
    disableKingMovements(king);
}

function disableKingMovements(king){
    king.movements.forEach(function(moveKing) {
        if(isAnEatingPawn(king, moveKing.x, moveKing.y)){
            moveKing.disable();
        }
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let piece = pieces[x][y];
                if (piece !== null && piece.color !== actualPlayer.color) {
                    //disable moves on trajectory but after the piece
                    let lastMoveTrajectory = null;
                    for(let i = 0; i < piece.movements.length; i++){
                        let move = piece.movements[i];
                        if(move.x === king.x && move.y === king.y && move.enabled) {
                            lastMoveTrajectory = move;
                        }else if(lastMoveTrajectory !== null){
                            if(move.previousMove === lastMoveTrajectory){
                                lastMoveTrajectory = move;
                            }
                        }
                    }
                    while(lastMoveTrajectory !== null){
                        king.movements.forEach(function(moveToDisable){
                            if((moveToDisable.x === lastMoveTrajectory.x && moveToDisable.y === lastMoveTrajectory.y))
                                moveToDisable.disable();
                        });
                        lastMoveTrajectory = lastMoveTrajectory.previousMove;
                        if(lastMoveTrajectory !== null && lastMoveTrajectory.x === king.x && lastMoveTrajectory.y === king.y)
                            lastMoveTrajectory = null;
                    }
                    //to this we disable moves on trajectory after current piece
                    piece.movements.forEach(function (move) {
                        if (!(piece instanceof Pawn) && move.x === moveKing.x && move.y === moveKing.y && (move.enabled || isAnEnemyPieceOnCase(king, moveKing.x, moveKing.y))) {
                            moveKing.disable()
                        }
                    });
                }
            }
        }
    });
}

function doesArrayIncludeCoordsArray(arrayOfCoords, coords){
    for(let i = 0; i< arrayOfCoords.length;i++){
        if(arrayOfCoords[i][0] === coords[0] && arrayOfCoords[i][1] === coords[1])
            return true;
    }
    return false;
}

function setKingInCheck(){
    let king = null;
    for(let x=0;x<8;x++){
        for(let y=0; y<8; y++){
            let piece = pieces[x][y];
            if(piece !== null && piece instanceof King && piece.color === actualPlayer.color){
                king = piece;
                break;
            }
        }
    }
    king.clearPiecesChecking();
    for(let x=0;x<8;x++){
        for(let y=0; y<8; y++){
            let piece = pieces[x][y];
            if(piece !== null && piece.canMove() && piece.color !== actualPlayer.color){
                for(let i=0; i<piece.movements.length; i++){
                    let pieceToCheck = pieces[piece.movements[i].x][piece.movements[i].y];
                    if(pieceToCheck === king && piece.movements[i].enabled){
                        pieceToCheck.addPieceChecking(piece);
                    }
                }
            }
        }
    }
    return king;
}

function addClickOnPiece(x, y){
    let htmlPiece = piecesHtml[x][y];
    htmlPiece.classList.add("cursorPointer");
    htmlPiece.positionX = x;
    htmlPiece.positionY = y;
    htmlPiece.addEventListener("click", clickOnPieceEvent);
}

function clickOnPieceEvent(e){
    removeSelectedPieceClass();
    pawnClickedXY = [e.target.positionX, e.target.positionY];
    let piece = pieces[e.target.positionX][e.target.positionY];
    let pieceHtml = piecesHtml[e.target.positionX][e.target.positionY];
    pieceHtml.classList.add("selectedPiece");
    displayMoves(piece);
}

function displayMoves(piece){
    for(let i=0; i<piece.movements.length; i++){
        if(piece.movements[i].enabled)
            addClickOnCase(piece, piece.movements[i].x, piece.movements[i].y)
    }
}

function removeSelectedPieceClass(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            casesHtml[i][j].removeEventListener("click", movePieceToCase);
            let pieceHtml = piecesHtml[i][j];
            let caseHtml = casesHtml[i][j];
            if(pieceHtml !== null)
                pieceHtml.classList.remove("selectedPiece");
            caseHtml.classList.remove("caseSelectable");
            caseHtml.classList.remove("caseEatable");
        }
    }
}

function endTurn(){
    removeSelectedPieceClass();
    removeAllListeners();

    invertActualPlayer();
    displayActualPlayer();
    play();
}

function removeAllListeners(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(piecesHtml[i][j] != null){
                piecesHtml[i][j].removeEventListener("click", clickOnPieceEvent);
                piecesHtml[i][j].classList.remove("cursorPointer");
            }
            casesHtml[i][j].removeEventListener("click", movePieceToCase)
        }
    }
}

function checkIfCaseIsOnBoard(x, y){
    return !(x < 0 || x > 7 || y < 0 || y > 7);
}

function isSamePieceOnCase(piece, x , y){
    if(checkIfCaseIsOnBoard(x, y)) {
        let otherPiece = pieces[x][y];
        if (otherPiece == null)
            return false;
        return piece.color === otherPiece.color;
    }
    return false;
}

function isAnEnemyPieceOnCase(piece, x, y){
    if(checkIfCaseIsOnBoard(x, y)) {
        let otherPiece = pieces[x][y];
        if (otherPiece == null)
            return false;
        return piece.color !== otherPiece.color;
    }
    return false;
}

function isAnEnemyPawnOnCase(piece, x, y){
    if(checkIfCaseIsOnBoard(x, y)) {
        let otherPiece = pieces[x][y];
        if (otherPiece == null)
            return false;
        if (piece.color !== otherPiece.color && otherPiece instanceof Pawn)
            return true;
    }
    return false;
}

function isAnEatingPawn(king, moveX, moveY){
    let diff = 0;
    if(king.color === COLORWHITE){
        diff = -1;
    }else if(king.color === COLORBLACK){
        diff = 1;
    }
    return (isAnEnemyPawnOnCase(king, moveX - 1, moveY + diff) || isAnEnemyPawnOnCase(king, moveX + 1, moveY + diff));
}

function addClickOnCase(piece, x, y){
    let caseHtml = casesHtml[x][y];
    if(piece.getMovement(x, y).eatable)
        caseHtml.classList.add("caseEatable");
    else
        caseHtml.classList.add("caseSelectable");
    caseHtml.addEventListener("click", movePieceToCase);
}

function movePieceToCase(e){
    let pieceToMoveX = pawnClickedXY[0];
    let pieceToMoveY = pawnClickedXY[1];

    let pieceTomove = pieces[pieceToMoveX][pieceToMoveY];
    let pieceHtmlToMove = piecesHtml[pieceToMoveX][pieceToMoveY];

    let xToMove = e.target.positionX;
    let yToMove = e.target.positionY;

    if(pieceTomove instanceof Pawn){
        //pour savoir si un pion s'est décalé de deux cases
        pieceTomove.setPawnMoveTwoCase(Math.abs(yToMove - pieceToMoveY) === 2);
        if(Math.abs(xToMove - pieceToMoveX) === 1){
            let increment = -1; //black
            if(pieceTomove.color === COLORWHITE)
                increment = 1;
            if(isAnEnemyPieceOnCase(pieceTomove, xToMove, yToMove+increment) && pieces[xToMove][yToMove+increment].panwMoveTwoCase){ //prise en passant
                pieces[pieceToMoveX][pieceToMoveY] = null;
                if(piecesHtml[xToMove][yToMove+increment] !== null){
                    piecesHtml[xToMove][yToMove+increment].parentNode.removeChild(piecesHtml[xToMove][yToMove+increment]);
                    pieces[xToMove][yToMove+increment] = null;
                }
            }
        }
    }

    createAudio();

    pieces[xToMove][yToMove] = pieceTomove;
    pieceTomove.x = xToMove;
    pieceTomove.y = yToMove;
    pieces[xToMove][yToMove].incrementTurn();
    pieces[pieceToMoveX][pieceToMoveY] = null;

    if(piecesHtml[xToMove][yToMove] !== null)
        piecesHtml[xToMove][yToMove].parentNode.removeChild(piecesHtml[xToMove][yToMove]);

    piecesHtml[xToMove][yToMove] = pieceHtmlToMove;
    piecesHtml[pieceToMoveX][pieceToMoveY] = null;

    piecesHtml[xToMove][yToMove].style.top = yToMove*sizeOfCase+"px";
    piecesHtml[xToMove][yToMove].style.left = xToMove*sizeOfCase+"px";

    //rock detection
    if(pieceTomove instanceof King){
        let move = xToMove - pieceToMoveX;
        let xBefore;
        let xAfter;
        let isARock = false;
        if(move === -2){
            xBefore = 0;
            xAfter = 3;
            isARock = true;
        }else if(move === 2){
            xBefore = 7;
            xAfter = 5;
            isARock = true;
        }
        if(isARock){
            let piece = pieces[xBefore][yToMove];
            pieces[xBefore][yToMove] = null;
            pieces[xAfter][yToMove] = piece;
            let pieceHtml = piecesHtml[xBefore][yToMove];
            piecesHtml[xBefore][yToMove] = null;
            piecesHtml[xAfter][yToMove] = pieceHtml;

            pieceHtml.style.top = yToMove*sizeOfCase+"px";
            pieceHtml.style.left = xAfter*sizeOfCase+"px";
        }
    }

    if(pieceTomove instanceof Pawn){
        if(pieceTomove.color === COLORWHITE && yToMove === 0){
            pieces[xToMove][yToMove] = new Queen(COLORWHITE, pieceTomove.turn);
            piecesHtml[xToMove][yToMove].classList.remove("pawnWhite");
            piecesHtml[xToMove][yToMove].classList.add("queenWhite");
        }else if(pieceTomove.color === COLORBLACK && yToMove === 7){
            pieces[xToMove][yToMove] = new Queen(COLORBLACK, pieceTomove.turn);
            piecesHtml[xToMove][yToMove].classList.remove("pawnBlack");
            piecesHtml[xToMove][yToMove].classList.add("queenBlack");
        }
    }

    endTurn();
}

function setSize(){
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    let max = clientWidth;
    if(clientHeight < max)
        max = clientHeight;
    game.style.width = max+"px";
    game.style.height = max+"px";
    sizeOfCase = max/8;
    for(let x=0;x<8;x++){
        for(let y=0;y<8;y++){
            if(piecesHtml[x][y] !== null){
                piecesHtml[x][y].style.top = y*sizeOfCase+"px";
                piecesHtml[x][y].style.left = x*sizeOfCase+"px";
            }
        }
    }
}

function invertActualPlayer(){
    if(actualPlayer === playerBlack)
        actualPlayer = playerWhite;
    else
        actualPlayer = playerBlack;
}

function displayActualPlayer(){
    if(actualPlayer === playerBlack)
        displayTextAnimation(languageFile["BLACK_TURN"]);
    else
        displayTextAnimation(languageFile["WHITE_TURN"]);
}

function displayTextAnimation(text){
    let message = document.createElement("div");
    message.classList.add("animation-current-player");
    message.appendChild(document.createTextNode(text));
    document.body.appendChild(message);
    message.addEventListener("animationend", function(){
        message.parentNode.removeChild(message);
    });
}

function createAudio(){
    let audio = document.createElement("audio");
    audio.src = "/public/sounds/tile_movement.mp3";
    audio.addEventListener("ended", function(e){
        audio.remove();
    });
    audio.play();
    document.body.appendChild(audio);
}

function endGame(){
    let container = document.createElement("div");
    container.id = "blackContainer";

    let text = document.createElement("p");
    let txt = languageFile["GAME_FINISHED"] + getTimeGame();
    if(actualPlayer.color === COLORBLACK){
        txt += "<br />" + languageFile["WHITE_WIN"];
    }else{
        txt += "<br />" + languageFile["BLACK_WIN"];
    }
    text.innerHTML = txt;
    container.appendChild(text);
    document.body.appendChild(container);
}

function getTimeGame(){
    let date = new Date(null);
    date.setSeconds(time)
    let result = date.toISOString().substr(11, 8);
    result = result.split(":");
    let finalString = "";
    if(result[0] !== "00"){
        if(result[0][0] === "0") { //moins de 10 heures
            finalString += " " + result[0][1];
        }else{
            finalString += " " + result[0];
        }
        if(parseInt(result[0]) > 1)
            finalString += " " + languageFile["HOURS"];
        else
            finalString += " " + languageFile["HOUR"];
    }

    if(result[1][0] === "0") { //moins de 10 minutes
        finalString += " " + result[1][1];
    }else{
        finalString += " " + result[1];
    }
    if(parseInt(result[1]) > 1)
        finalString += " " + languageFile["MINUTES"];
    else
        finalString += " " + languageFile["MINUTE"];

    if(result[2][0] === "0") { //moins de 10 secondes
        finalString += " " + result[2][1];
    }else{
        finalString += " " + result[2];
    }
    if(parseInt(result[2]) > 1)
        finalString += " " + languageFile["SECONDS"];
    else
        finalString += " " + languageFile["SECOND"];
    return finalString;
}

function loadLanguage(){
    let userLanguage = navigator.language;
    userLanguage = userLanguage.split("-")[0];
    if(userLanguage !== "fr" && userLanguage !== "en")
        userLanguage = "en";

    document.documentElement.lang = userLanguage;
    let getLanguageFile = new XMLHttpRequest();
    getLanguageFile.open("GET", "./public/languages/"+userLanguage+".json", true);
    getLanguageFile.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && this.status === 200){
            languageFile = JSON.parse(this.responseText);
            initGame();
        }
    });
    getLanguageFile.send(null);
}
