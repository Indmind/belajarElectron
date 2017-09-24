
var score = 0;
obstacles = [];
var cont = true;
var gamePlayed = false;
var val = 0;
var go = false;
var ve = 0;
var ves = false;
var obsNum = 100;

function setup(){
    createCanvas (340, 420);
    frameRate(144);
    character = new character();
    trigger = new trigger();
    
    
}

function draw(){
    background('#00FFE2');
    fill('#BA6301');
    rect(-1, 160, 341, 50);
    textSize(10);
    
    text("scores: "+score,width-70, 20);
    trigger.draw();
    
    if(!gamePlayed){
    	fill('#98000F');
		text("touch or click here to play",(width/2)-60, (height/2)+100);
		fill("#FF0900");
		textSize(50);
		text("Ready?", (width/2)-75, 90);
	}
    
    if(gamePlayed){
   	 for (var i = obstacles.length-1; i >= 0; i--) {
       	 obstacles[i].update();
       	 obstacles[i].show();
       	 obstacles[i].addScore();
        
      	  if (obstacles[i].offscreen()) {
       	     obstacles.splice(i, 1);
    	    }
       	 if(obstacles[i].hits()){
        	    cont = false;
         	   alert("you lose, your score is: "+score);
        	    score = 0;
             gamePlayed = false;
       	 }
       	 
       
       	 if(!cont){
            	obstacles.splice(i, 2);
       	 }
    	}
    }
    
    character.update()
    character.show();
    
    //character.move();
    if(gamePlayed){
    	if(cont){
    		if (frameCount % obsNum == 0) {
     			   obstacles.push(new obstacle());
   		 }
  		  //if(frameCount % 60 == 20){
        		//character.jump();
  		  //}
   		 //if (frameCount % 90 == 80) {
       		// score += 1;
   		// }
   		 //if (frameCount % 120 == 0) {
   		//	character.right();
   		// }
   		val++;
   		go = true;
   		if(val >= 50){
   			go = false
   		}
   		if(go){
   			fill("#3B8D00");
   			textSize(50);
   			text("Go!", (width/2)-40, 90);
   		}
    		
    		if(ve == 20){
    			ve = 0;
    			ves = false;
    		}
    		if(ves){
    			ve++;
    			fill("#24BEFF");
    			textSize(50);
    			text("Point", (width/2)-60, 90);
    		}
   	 }
    }
    
    
}

function mousePressed() {
	trigger.clicked();
}


function trigger(){
	this.draw = function(){
		fill("#AEFFFF");
		rect(-1, 210, 341, 420-(160+50));
	}
	
	this.clicked = function(){
		if(mouseY > 210){
			if(!gamePlayed){
				gamePlayed = true;
                cont = true;
			}
   		 //if(character.notJump()){
        		character.jump();
  		  //}
		}
		
		if(mouseX < 70 || mouseX > 280){
			if(mouseX > -50 && mouseX < 400){
				if(mouseY > -90 && mouseY < -30){
					window.location.href = "../index.php";
				}
			}
		}
	}
}

function obstacle(){
	this.top = Math.floor(Math.random()*((160-10)-(160-20))+(160-20));
    this.x = width;
    this.w = 20;
    this.speed = 2;
    this.treeLine = Math.floor(Math.random()*(200 - 170)+170);
    this.treePos = Math.floor(Math.random()*(30 - 10) + 10);
    
    this.highlight = false;

    this.hits = function(){
      if (character.y+30 > this.top && character.y+30 <= 160) {
        if (character.x+30 > this.x && character.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      return false;
    }
    
    this.addScore = function(){
    	if(character.x == this.x+20){
    		score++;
    		ves = true;
    		obsNum-=-1;
    	}
    }

    this.show = function() {
      fill('#22BE00');
      rect(this.x, this.top, this.w, 160-this.top);
    }

    this.update = function() {
   	 this.x -= this.speed;
    }

    this.offscreen = function() {
      if (this.x < -this.w) {
    	  return true;
      } else {
     	 return false;
      }
    }
}

function character(){
    this.x = 20;
    this.y = 130;
    this.dir = 1;
    
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
    
    this.move = function(){
    	this.x += this.dir;
    	if(this.x == 310){
    		this.dir = -1;
    	}
    	if(this.x == 0){
    		this.dir = 1;
    	}
    }
    
    this.show = function(){
        fill('#00FF9D');
        rect(this.x, this.y, 30, 30);
    }
    
    this.jump = function(){
        this.velocity += this.lift;
    }
    
    this.notJump = function(){
        return (this.y == 130);
    }
    
    this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    

    if (this.y > 130) {
      this.y = 130;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }
    
}

/**
window.onload = function(){
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b l=0;8=[];b z=f;b m=a;b O=0;b t=a;b u=0;b r=a;b H=16;5 1U(){1T(1S,Y);1R(1Q);7=L 7();p=L p()}5 N(){1N(\'#1M\');d(\'#1L\');s(-1,g,Q,j);D(10);4(l>=1){n("11: "+H,e-M,c)}4(l<1){n("11: 0",e-M,c)}p.N();4(!m){d(\'#1J\');n("1G 1F 1E 1D 1d 1B",(e/2)-P,(1A/2)+16);d("#1y");D(j);n("1v?",(e/2)-1u,B)}4(m){1t(b i=8.1s-1;i>=0;i--){8[i].v();8[i].A();8[i].Z();4(8[i].12()){8.13(i,1)}4(8[i].14()){z=a;1q("1p 1i, 1C l 1e: "+l);1b.1c.1a="19.1f"}4(!z){8.13(i,2)}}}7.v()7.A();4(m){4(z){4(1g%H==0){8.1h(L 18())}O++;t=f;4(O>=j){t=a}4(t){d("#1j");D(j);n("1k!",(e/2)-1l,B)}4(u==c){u=0;r=a}4(r){u++;d("#1m");D(j);n("1n",(e/2)-P,B)}}}}5 1o(){p.17()}5 p(){3.N=5(){d("#1r");s(-1,X,Q,Y-(g+j))}3.17=5(){4(K>X){4(!m){m=f}7.T()}4(C<M||C>1w){4(C>-j&&C<1x){4(K>-B&&K<-k){1b.1c.1a="../19.1z"}}}}}5 18(){3.F=o.I(o.J()*((g-10)-(g-c))+(g-c));3.x=e;3.w=c;3.U=2;3.1H=o.I(o.J()*(1I-S)+S);3.1K=o.I(o.J()*(k-10)+10);3.W=a;3.14=5(){4(7.y+k>3.F&&7.y+k<=g){4(7.x+k>3.x&&7.x<3.x+3.w){3.W=f;q f}}q a}3.Z=5(){4(7.x==3.x+c){l++;r=f;H-=-1}}3.A=5(){d(\'#1O\');s(3.x,3.F,3.w,g-3.F)}3.v=5(){3.x-=3.U}3.12=5(){4(3.x<-3.w){q f}1P{q a}}}5 7(){3.x=c;3.y=E;3.G=1;3.V=0.6;3.R=-15;3.h=0;3.1V=5(){3.x+=3.G;4(3.x==1W){3.G=-1}4(3.x==0){3.G=1}}3.A=5(){d(\'#1X\');s(3.x,3.y,k,k)}3.T=5(){3.h+=3.R}3.1Y=5(){q(3.y==E)}3.v=5(){3.h+=3.V;3.h*=0.9;3.y+=3.h;4(3.y>E){3.y=E;3.h=0}4(3.y<0){3.y=0;3.h=0}}}',62,123,'|||this|if|function||character|obstacles||false|var|20|fill|width|true|160|velocity||50|30|score|gamePlayed|text|Math|trigger|return|ves|rect|go|ve|update||||cont|show|90|mouseX|textSize|130|top|dir|obsNum|floor|random|mouseY|new|70|draw|val|60|341|lift|170|jump|speed|gravity|highlight|210|420|addScore||scores|offscreen|splice|hits||100|clicked|obstacle|index|href|window|location|to|is|html|frameCount|push|lose|3B8D00|Go|40|24BEFF|Point|mousePressed|you|alert|AEFFFF|length|for|75|Ready|280|400|FF0900|php|height|play|your|here|click|or|touch|treeLine|200|98000F|treePos|BA6301|00FFE2|background|22BE00|else|144|frameRate|340|createCanvas|setup|move|310|00FF9D|notJump'.split('|'),0,{}))
}*/
