'use strict';

//Variables globales 

var sudoku = [];
var prueba = [];

//Creando tablero

function createBoard(){

    var board = document.getElementById("sudoku");

    for(let i = 0; i < 9 ; i++){
        let row = document.createElement("div");
        row.className = "r" + i.toString();
        sudoku.push([]);
        for(let j = 0 ; j <9 ; j++){
            let cell = document.createElement("input");
            cell.id = i.toString() + j.toString();
            cell.className= "cell";
            if(j == 3 || j == 6){
                cell.style.marginLeft = "5px"; 
            }
            sudoku[i].push('');
            row.appendChild(cell);
        }
        board.append(row);
    }
    createFirstRow();
    createSudoku();
    console.log(sudoku);
}

function createSudoku(){
    var coor = findEmpty();
    if(coor == true){
        return true;
    }else{
        for(let i = 1 ; i < 10 ; i++){
            if(isValid(coor , i)){
                sudoku[coor[0]][coor[1]] = i;
                if(createSudoku()){
                    return true;
                }
                sudoku[coor[0]][coor[1]] = '';

            }
        }
    }
   
}

function isValid(coor , val){
    if(sudoku[coor[0]].indexOf(val) != -1){
        return false;
    }

    for(let i = 0 ; i < 9 ; i++){
        if(sudoku[i][coor[1]] == val && i != coor[0]){
            return false;
        }
    }

    let x = Math.floor((coor[1] / 3));
    let y = Math.floor((coor[0] / 3));

    for(let i = y*3 ; i < (y*3)+3 ; i++){
        for(let j = x * 3 ; j < (x*3)+1 ; j++){
            let ban = sudoku[i][j] == val;
            let ban1 = (i != coor[0] && j != coor[1]);
            if(ban && ban1 ){
                return false;
            }
        }
    }
    
    return true;

}

function findEmpty(){

    for(let i = 0; i < 9 ; i++){
        for(let j = 0; j < 9 ; j++){
            if(sudoku[i][j] == ''){
                return [i, j];
            }
        }
    }

    return true;

}


function createFirstRow(){


    if(sudoku[0].indexOf('') == -1){

        return false;
    
    }else{

        let rand = Math.floor(Math.random() * (10 - 1) + 1);
        if(sudoku[0].indexOf(rand) != -1){
            
        }else{
            sudoku[0][sudoku[0].indexOf('')] = rand;
        }
        
        createFirstRow();
    }

}

createBoard();
