const SCREEN_WIDTH = 1200;
const SCREEN_HEIGHT = 1200;

const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = SCREEN_HEIGHT;


const slice_w = 5;
const slice_h = 5;
let w,h;

let board=[];
let tiles=[];

let blankSpot = -1;
let solvedFlag = false;



let puzzle_source;
let pageBGM;
let spritesheet;


let snow = [];
let textures = [];

let gravity; 


function preload(){
     
  spritesheet = loadImage("f32.png");
  puzzle_source = loadImage("JinPopo.jpg"); 
   
  pageBGM = loadSound('jingle-bells-orchestra.mp3');
     
}




function setup(){

    createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);
    pageBGM.loop();

    // set up slide puzzle part

    w = IMAGE_WIDTH / slice_w;
    h = IMAGE_HEIGHT / slice_h;
    
    for(let i=0;i<slice_w;i++)
        for(let j=0;j<slice_h;j++){
            let x = i*w;
            let y = (j+1)*h;
            let img = createImage(w,h);
            img.copy(puzzle_source,x,y,w,h,0,0,w,h);

            let idx = i + j*slice_h;
            board.push(idx);
            let tile = new Tile(idx,img);
            tiles.push(tile);
        }
    
    // remove the first part
    board[0] = -1;

    board_shuffle(board);


    // set up snow effect
    gravity = createVector(0,0.01);


    // slice snowflake images
    for(let x=0;x<spritesheet.width;x+=32)
        for(let y=0;y<spritesheet.height;y+=32){
            let img = spritesheet.get(x,y,32,32);
            textures.push(img);
        }


}



function swap(i,j,arr){

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}



function board_shuffle(arr){

    for(let i=0;i<1000;i++){
        randomMove(arr);
    }

}


function randomMove(arr){
    let r1 = floor(random(0,slice_h));
    let r2 = floor(random(0,slice_w));
    tileMove(r1,r2,arr);

}


function tileMove(i,j,arr){
    let blank = findBlank();
    let blankCol = blank % slice_w;
    let blankRow = floor(blank / slice_h);

    if(isNeighbor(i,j,blankCol,blankRow)){
        swap(blank,i+j*slice_w,arr);
    }

}


function isNeighbor(i,j,x,y){
    if(i!==x && j!==y)
        return false;

    if(abs(i-x)==1 || abs(j-y)==1)
        return true;

    return false;
}




function findBlank(){
    for(let i=0;i<board.length;i++)
        if(board[i] == -1) return i;

}


function mousePressed(){
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    console.log(i,j);
    tileMove(i,j,board);
    
}


function isSolved(){

    if(solvedFlag == true)
        return;

    for(let i=1;i<board.length;i++)
        if(board[i] !== tiles[i].idx)
            return false;

    return true;
}



function draw(){
    background(30);
    //image(puzzle_source,0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
   

    // draw slide puzzle
    for(let i=0;i<slice_w;i++)
        for(let j=0;j<slice_h;j++){
            let index = i + j*slice_h;    
            let x = i * w;
            let y = j * h;
            let tileIndex = board[index];
            if(board[index] > -1){
                let img = tiles[tileIndex].img;
                image(img,x,y,w,h);
            }
        }

    for(let i=0;i<slice_w;i++)
        for(let j=0;j<slice_h;j++){
            let x = i * w;
            let y = j * h;
            strokeWeight(5);
            noFill();
            rect(x,y,w,h);
        }
    
    if(isSolved()){
        solvedFlag = true;
        //alert("Solved!! Well done Popopopopopopopo");
    }


    // draw snow effects
    let design = random(textures);
    snow.push(new Snowflake(design));

    for(flake of snow){
        flake.update();
        flake.render();
    }

    for(let i=snow.length-1;i>=0;i--){
        if(snow[i].offScreen()){
            snow.splice(i,1);
        }
    }

}