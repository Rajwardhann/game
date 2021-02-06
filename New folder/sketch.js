
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gamestate = "normalplay"
var blackcar;
var talk1 = "Hey are you Lester?"
function preload(){
	bg2img = loadImage("Modern City/city.png")
	bgimg = loadImage("Modern City/Modern City/_Example.png");
	vickystableDown = loadAnimation("vidown2.png")
	vickystableRight = loadAnimation("viright2.png")
	vickystableLeft = loadAnimation("vileft2.png")
	vickystableup = loadAnimation("viup2.png")
	vickyrightimg = loadAnimation("viright1.png","viright2.png","viright3.png")
	vickyleftimg = loadAnimation("vileft1.png","vileft2.png","vileft3.png")
	vickydownimg = loadAnimation("vidown1.png","vidown2.png","vidown3.png")
	vickyupimg = loadAnimation("viup1.png","viup2.png","viup3.png")
	lesterdownimg = loadImage("lesterd.png");
	lesterrightimg = loadImage("lesterr.png");
	blackcarimg = loadImage("car.png");
	laptopimg = loadImage("laptop.png");
	vipimg = loadImage("vip.png");
	deadbodyimg = loadImage("deadbody.png");
	houseimg = loadImage("house.png");
	simeonimg = loadImage("simeon.png");
	arenaimg = loadImage("road.png");
	car1img = loadImage("orangecar.png")
	car2img = loadImage("Audi.png");
	car3img = loadImage("supercar.png");
}
function setup(){
	var canvas = createCanvas(600,400);

	bg = createSprite(2265,850,1200,600);
	bg.addImage(bgimg);
	bg.scale = 4;

	bg2 = createSprite(185,10,400,600)
	bg2.addImage(bg2img);
	bg2.scale = 1.5;

	blackcar = createSprite(2280,1000,60,30);
	blackcar.addImage(blackcarimg);
	blackcar.scale = 1.3;
	blackcar.visible = false;
	//blackcar.debug = true;

	
	housemission2 = createSprite(1230,-220,50,50);
	housemission2.addImage(houseimg);
	housemission2.scale = 2;
	

	arena = createSprite(200,1500,600,600);
	arena.addImage(arenaimg);
	arena.scale = 1.2;

	car1 = createSprite(15,1700,50,50);
	car1.addImage(car1img);

	car2 = createSprite(210,1700,50,50);
	car2.addImage(car2img);

	car3 = createSprite(430,1700,50,50);
	car3.addImage(car3img);
	
	
	

	vicky = createSprite(300,210,50,50);
	vicky.addAnimation("stillu",vickystableup);
	vicky.addAnimation("stilll",vickystableLeft);
	vicky.addAnimation("stillr",vickystableRight);
	vicky.addAnimation("stilld",vickystableDown);
	vicky.addAnimation("rightl",vickyrightimg);
	vicky.addAnimation("leftl",vickyleftimg);
	vicky.addAnimation("downl",vickydownimg);
	vicky.addAnimation("upl",vickyupimg);
	vicky.scale = 0.7;

	lester = createSprite(1,10,40,40);
	lester.addImage(lesterdownimg);
	lester.scale = 0.7;

	simeon = createSprite(1230,5,20,20);
	simeon.addImage(simeonimg);
	simeon.scale = 0.4;
	
	laptop = createSprite(550,380,60,30);
	laptop.addImage(laptopimg);
	laptop.scale = 0.4;
	laptop.visible = false;

	vip = createSprite(2800,775,30,30);
	vip.addImage(vipimg);
	vip.scale = 1.2;

	invg = createSprite(2800,1100,40,20);
	invg.visible = false;

	engine = Engine.create();
	world = engine.world;

	Engine.run(engine);

}

function draw(){
	
	background("green");
	drawSprites();
	
	
	
	
	
	if(gamestate==="normalplay")
	{
		keyPressed();
		if(vicky.isTouching(lester))
		{
			gamestate = "mission1";
		}
	}

	if(gamestate==="mission1")
	{
		keyPressed();
		
		fill("red");
		text("this is mission1",2,10)
		if(frameCount%80 === 0)
		{
			gamestate = "mission1start";

		}
	}
	
	if(gamestate === "mission1start")
	{
		vicky.bounceOff(blackcar);
	    blackcar.visible = true;
		keyPressed();
		text("mission1 started",2,10);
		if(vicky.isTouching(blackcar))
		{
			gamestate = "hackmode";
		}
		
	}

	if(gamestate === "hackmode")
	{
		keyPressed();
		fill("yellow");
		textSize(20);
		text("Press E to to open laptop",230,360);

		if(keyDown("e"))
		{
			gamestate = "hackon";
		}
	}

	if(gamestate === "hackon")
	{
		laptop.visible = true;
		fill("green");
		textSize(10);
		text("Available devices",450,350)
		text("Hack Black Car - Press enter",450,380);

		if(keyDown("enter"))
		{
			gamestate = "hackclose";
		}
	}

	if(gamestate === "hackclose")
	{
		fill("yellow")
		laptop.visible = false;
		textSize(10);
		 text("Car hacked!! ,Now control it and kill the VIP",200,370);

		keyPressedcar();

		vip.velocityY = 3;
		if(vip.isTouching(invg))
		{
			vip.velocityY = 0;
		}

		if(blackcar.isTouching(vip))
		{
			vip.addImage(deadbodyimg);
			vip.scale = 0.3;
			if(frameCount%80 === 0)
			{
				gamestate = "mission1 completed";
			}
		}

		
	}
	
	if(gamestate === "mission1 completed")
	{

		
		keyPressed();
		vicky.x =width/2;
		vicky.y = height/2;
		blackcar.visible = false;
		vip.visible = false;
		fill("blue");
		text("Go back to lester",250,370);
	
		if(vicky.isTouching(lester))
		{
			gamestate = "mission1over";
		}
	}
	
	if(gamestate === "mission1over")
	{
		keyPressed();
		fill("yellow");
		text("well done press E to continue",2,10)
		if(keyDown("e"))
		{
			gamestate = "normalplay2"
		}
	}

	if(gamestate === "normalplay2")
	{
		keyPressed();
		text("For next mission meet Lester",2,10);
		vicky.x = 300;
		vicky.y = 210;
		if(vicky.isTouching(lester))
		{
			fill("yellow");
			text("this is mission2",2,10);
			if(frameCount%80 === 0)
			{
				gamestate = "mission2started";
			}
		}
	}

	if(gamestate === "mission2started")
	{
		keyPressed();
		fill("yellow");
		text("mission2 started",2,10)
		if(vicky.isTouching(simeon))
		{
			gamestate = "mission2main";
		}
	}

	if(gamestate === "mission2main")
	{
		keyPressed();
		fill("blue");
		textSize(15);
		text("Go to Arena",150,370)
		if(vicky.isTouching(car2))
		{
			gamestate = "inthecar";
		}
		
	}

	if(gamestate === "inthecar")
	{
		vicky.visible = false;
		keyPressedrace();
	}


	
	
	
}

function keyPressed(){
	if(keyDown("right"))
	{
		vicky.changeAnimation("rightl",vickyrightimg)
		bg.x = bg.x - 4;
		bg2.x = bg2.x - 4;
		lester.x = lester.x - 4;
		blackcar.x = blackcar.x - 4;
		vip.x = vip.x - 4;
		invg.x = invg.x -4;
		housemission2.x = housemission2.x -4;
		simeon.x = simeon.x - 4;
		arena.x = arena.x - 4;
		car1.x = car1.x - 4;
		car2.x = car2.x - 4;
		car3.x = car3.x - 4;
	}else if(keyWentUp("right"))
	{
		vicky.changeAnimation("stillr",vickystableRight)
	}
	if(keyDown("left"))
	{
		vicky.changeAnimation("leftl",vickyleftimg)
		bg.x = bg.x + 4;
		bg2.x = bg2.x + 4;
		lester.x = lester.x + 4;
		blackcar.x = blackcar.x + 4;
		vip.x = vip.x + 4;
		invg.x = invg.x +4;
		housemission2.x = housemission2.x +4;
		simeon.x = simeon.x + 4;
		arena.x = arena.x + 4;
		car1.x = car1.x + 4;
		car2.x = car2.x + 4;
		car3.x = car3.x + 4;
	}else if(keyWentUp("left"))
	{
		vicky.changeAnimation("stilll",vickystableLeft)
	}

	if(keyDown("up"))
	{
		vicky.changeAnimation("upl",vickyupimg)
		bg.y = bg.y + 4;
		bg2.y = bg2.y + 4;
		lester.y = lester.y + 4;
		blackcar.y = blackcar.y + 4;
		vip.y = vip.y + 4;
		invg.y = invg.y +4;
		housemission2.y = housemission2.y +4
		simeon.y = simeon.y + 4;
		arena.y = arena.y + 4;
		car1.y = car1.y + 4;
		car2.y = car2.y + 4;
		car3.y = car3.y + 4;
	}else if(keyWentUp("up"))
	{
		vicky.changeAnimation("stillu",vickystableup)
	}

	if(keyDown("down"))
	{
		vicky.changeAnimation("downl",vickydownimg)
		bg.y = bg.y - 4;
		bg2.y = bg2.y - 4;
		lester.y = lester.y - 4;
		blackcar.y = blackcar.y - 4;
		vip.y = vip.y - 4;
		invg.y = invg.y -4;
		housemission2.y = housemission2.y -4
		simeon.y = simeon.y - 4;
		arena.y = arena.y - 4;
		car1.y = car1.y - 4;
		car2.y = car2.y - 4;
		car3.y = car3.y - 4;
	}else if(keyWentUp("down"))
	{
		vicky.changeAnimation("stilld",vickystableDown)
	}

}

function keyPressedcar(){
	if(keyDown("up"))
	{
		bg.x = bg.x - 7;
		bg2.x = bg2.x - 7;
		lester.x = lester.x - 7;
		vicky.x = vicky.x -7;
		vip.x = vip.x - 7;
		invg.x = invg.x -7;
		housemission2.x = housemission2.x -7;
		simeon.x = simeon.x - 7;
		arena.x = arena.x - 7;
		car1.x = car1.x - 7;
		car2.x = car2.x - 7;
		car3.x = car3.x - 7;
	}

	if(keyDown("down"))
	{
		bg.x = bg.x + 7;
		bg2.x = bg2.x + 7;
		lester.x = lester.x + 7;
		vicky.x = vicky.x + 7;
		vip.x = vip.x + 7;
		invg.x = invg.x +7;
		housemission2.x = housemission2.x +7;
		simeon.x = simeon.x + 7;
		arena.x = arena.x + 7;
		car1.x = car1.x + 7;
		car2.x = car2.x + 7;
		car3.x = car3.x + 7;
	}

	if(keyDown("right"))
	{
		bg.y = bg.y - 7;
		bg2.y = bg2.y - 7;
		lester.y = lester.y - 7;
		vicky.y = vicky.y -7;
		vip.y = vip.y - 7;
		invg.y = invg.y -7;
		housemission2.y = housemission2.y -7;
		simeon.y = simeon.y - 7;
		arena.y = arena.y - 7;
		car1.y = car1.y - 7;
		car2.y = car2.y - 7;
		car3.y = car3.y - 7;
	}

	if(keyDown("left"))
	{
		bg.y = bg.y + 7;
		bg2.y = bg2.y + 7;
		lester.y = lester.y + 7;
		vicky.y = vicky.y + 7;
		vip.y = vip.y + 7;
		invg.y = invg.y +7;
		housemission2.y = housemission2.y +7
		simeon.y = simeon.y + 7;
		arena.y = arena.y + 7;
		car1.y = car1.y + 7;
		car2.y = car2.y + 7;
		car3.y = car3.y + 7;
	}

}


function keyPressedrace(){
	if(keyDown("up"))
	{
		arena.velocityY = arena.velocityY + 5;
		car1.velocityY = 6;
		car3.velocityY = 6;
		if(frameCount%100 === 0)
		{
			car1.velocityY = car1.velocityY + 0.2;
		}
	}


}

