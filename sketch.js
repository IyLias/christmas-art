const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 1000;

const slice_w = 4;
const slice_h = 4;

let source;
let spritesheet;

let snow = [];
let textures = [];

let gravity; 


function preload(){

  spritesheet = loadImage("f32.png");
  source = loadImage("JinPopo.jpg"); 

}




function setup(){

    createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);
    gravity = createVector(0,0.01);

    for(let x=0;x<spritesheet.width;x+=32)
        for(let y=0;y<spritesheet.height;y+=32){
            let img = spritesheet.get(x,y,32,32);
            textures.push(img);
        }


}



function draw(){
    background(30);
    image(source,SCREEN_WIDTH/8,SCREEN_HEIGHT/8,3*SCREEN_WIDTH/4,3*SCREEN_HEIGHT/4);
   
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