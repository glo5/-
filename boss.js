class Boss{
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

        this.fireTerm = 500;
    }

    reset (x, y, w, h, img, s, v, hp = 100){
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

    explosion(){
        //폭발이펙트 생성
        App.app.getOrCreateExplosion(this.x, this.y, this.w, this.w);
        score += 300;
        score1 += 300;
        kill += 1;
        document.querySelector("#gameover").style.display = "block";
        
        var audio = new Audio('https://surviv.io/audio/sfx/oven_break_01.mp3');
        audio.volume = 0.1;
        audio.play(); 
        this.active = false;
    }

    fire(){
        if(!this.active) return;
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 20, 400, new Vector(0, 3));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 300, new Vector(0, 3));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(-1, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(1, 0.5));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(-1, 0.5));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(0.5, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(-0.5, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(1, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector( 1, 0));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 1 , 3, 400, new Vector(-1, 0));

        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    update(d){
        if(!this.active) return;
        let normal = this.vector.normalize();
        let deltaY = this.y > 50 ? 50 : this.y + normal.y * d * this.speed;
        this.y = deltaY;

        if(parseInt(this.y) == 51) {
            if(this.x >= App.app.gameWidth - this.w){
                normal.active = 1;
            } else if(this.x <= 0){
                normal.active = 0;
            }
            
            if(normal.active == 1){
                this.x -= 3;
            } else{
                this.x += 3;
            }
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