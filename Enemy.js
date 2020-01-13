class Enemy{
    constructor(){
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = null;
        this.vector = null;
        this.speed = null;
        this.active = false;
        this.hp = null;

        this.fireTerm = 700;
    }

    reset (x, y, w, h, img, s, v, hp = 10){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.speed = s;
        this.vector = v;
        this.active = true; 
        this.hp = hp;
        this.fire();
    }

    setDamage(value){
        this.hp -= value;
        if(this.hp <= 0){
            this.explosion();
        }
    }

    // checkHitPlayer()
    //     {
    //         var rtnVal = false;
    //         var distanceX = (this.player.x + this.player.gameWidth/2)-this.enemy.x;
    //         var distanceY = (this.player.y + this.player.gameHeight/2)-this.enemy.y;
    //         var distance = distanceX * distanceX + distanceY * distanceY;
            
    //         if(distance <=(this.enemy.radius + (this.player.gameWidth/2 -5))
    //                     *(this.enemy.radius + (this.player.gameHeight/2 -5)))
    //                 rtnVal = true;
    //                 return rtnVal;
    
    //     }
    explosion(){
        //폭발이펙트 생성
        App.app.getOrCreateExplosion(this.x, this.y, this.w, this.w);
        var audio = new Audio('https://surviv.io/audio/sfx/oven_break_01.mp3');
        audio.play(); 
        audio.volume = 0.1;
        
        
        score += 100;
        score1 += 100;
        kill += 1;
        this.active = false;
    }

    fire(){
        if(!this.active) return;
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(0, 3));
        
        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    update(d){
        if(!this.active) return;
        let normal = this.vector.normalize();
        this.x += normal.x * d * this.speed;
        this.y += normal.y * d * this.speed;

        if(this.x < -this.w * 2 || this.y < - this.h * 2 
            || this.x > this.w + App.app.gameWidth 
            || this.y > this.h + App.app.gameHeight
            )
        {
            this.active = false;
        }
    }
    

    checkCollision(x,y,r){
        let centerX = this.x + this.w / 2;
        let centerY = this.y + this.h / 2;
        
        

        let d = Math.pow(centerX - x, 2) + Math.pow(centerY - y,2);
        
        

        return d < Math.pow(r + Math.min(this.w, this.h) / 2, 2);

        

        
    }

    render(ctx){
        if(!this.active) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}