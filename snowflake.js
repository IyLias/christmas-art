
class Snowflake{

    constructor(img,design){

        let x = random(SCREEN_WIDTH);
        let y = random(-100,0);

        this.design = design;
        this.img = img;

        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector();

        this.radius = random(3,15);
    }


    update(){
        
        this.acc = gravity;
        this.vel.add(this.acc);
        this.pos.add(this.vel);


    }


    render(){
        
        image(this.img,this.pos.x,this.pos.y,this.radius,this.radius);
    }



    offScreen(){
        return (this.pos.y > SCREEN_HEIGHT + this.radius);
    }


}