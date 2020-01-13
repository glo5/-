class App {
    constructor() {
        App.app = this; // 앱에 스태틱으로 넣었다 이말이야
        this.gameWidth = 600;
        this.gameHeight = 800;

        this.canvas = document.querySelector("#myGame");
        this.ctx = this.canvas.getContext("2d");
        this.start = false;
        this.imageList = {}; //이미지 저장 오브젝트
        this.player = null;
        this.backList = []; //배경그림 리스트
        this.playerBulletList = []; //플레이어 총알 리스트

        this.enemyList = []; //적기체 저장 리스트
        this.expList = []; //폭발리스트

        //여기에 스테이지 데이터 제어 변수들이 들어갑니다.
        this.gameTimer = 0; //게임이 시작되고 몇초가 흘렀는지 저장
        this.stageIdx = 0; //지금 몇번째 적을 만들어내는지 저장
        this.stageData = []; //스테이지의 데이터

        this.init(); //초기화 함수
    }

    async init() {
        this.imageList.player = await this.loadImage("player1.png");
        this.imageList.back = await this.loadImage("back1.png");
        this.imageList.enemy = await this.loadImage("enemy.png");
        this.imageList.boss = await this.loadImage("boss.png")
        this.imageList.explosion = await this.loadImage("explosion.png");
        this.imageList.box = await this.loadImage("box.png");
        this.imageList.gameover = await this.loadImage("end.jpg");

        //백그라운드 생성
        for (let i = 0; i < 3; i++) {
            this.backList.push(
                new Background(0, - i * this.gameHeight,
                    this.gameWidth, this.gameHeight,
                    this.imageList.back));
        }
        //플레이어 생성(x좌표 y좌표 너비 높이 이미지)
        this.player = new Player(
            this.gameWidth / 2 - 30, this.gameHeight - 40,
            40, 70, this.imageList.player, this);

        let stage = new Stage(this.gameWidth, this.gameHeight, this.imageList);
        this.stageData = stage.stage1;

        // let tempExp = new Explosion(100, 100, 60, 60, this.imageList.explosion);
        // this.expList.push(tempExp);

        
        // context.fillText("SCORE : "+ score , 5 ,20);

        requestAnimationFrame(this.frame.bind(this));
    }

    getOrCreateExplosion(x, y, w, h) {
        let exp = this.expList.find(x => !x.active);
        if (exp === undefined) {
            exp = new Explosion(this.imageList.explosion);
            this.expList.push(exp);
        }
        exp.setActive(x, y, w, h);
        
    }
    

    getOrCreateBullet(x, y, r, s, v, isEnemy = true) {
        let bullet = this.playerBulletList.find(x => !x.active);
        if (bullet == undefined) {
            bullet = new Bullet();
            this.playerBulletList.push(bullet);
        }
        bullet.setActive(x, y, r, s, v, isEnemy);
    }

    getOrCreateEnemy(data) {
        let e = this.enemyList.find(x => !x.active && x.name == data.k);
        if (e === undefined) {
            if (data.k == "enemy") {
                e = new Enemy();
            } else if (data.k == "boss") {
                e = new Boss();
            }
            this.enemyList.push(e);
        }
        e.reset(data.x, data.y, data.w, data.h, data.img, data.s, data.v);
    }


    loadImage(name) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = `./images/${name}`;
            img.addEventListener("load", () => {
                res(img);
            });
        });
    }

    frame(time) {
        if (!this.start) this.start = time;
        let delta = time - this.start;
        this.start = time;
        this.update(delta / 1000);
        this.render();
        requestAnimationFrame(this.frame.bind(this));
    }

    update(delta) {
        
        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'SCORE: ' + score;

        var scoreElement = document.getElementById('score1');
        scoreElement.innerHTML = 'SCORE: ' + score1;

        var scoreElement = document.getElementById('kill');
        scoreElement.innerHTML = 'KILL: ' + kill;

        if (!this.player.active) {
            document.querySelector("#gameover").style.display = "block";

            this.player = null;
            this.bullet = null;
            this.boss = null;
            this.stage = null;
            this.enemy = null;
            this.enemyList = null;
            this.playerBulletList = null;
            return;

        }
        if (this.checkCrash) {
            stopGameLoop();
        }

        this.gameTimer += delta; //이렇게 되면 게임 진행시간이 this.gameTimer에 들어간다.

        this.backList.forEach(back => back.update(delta));
        if (this.backList[0].y > this.gameHeight) {
            let first = this.backList.shift();
            first.y = this.backList[this.backList.length - 1].y - this.gameHeight;
            this.backList.push(first);
        }
        this.player.update(delta);
        this.player.checkOut(this.gameWidth, this.gameHeight);

        let nowEnemy = this.stageData[this.stageIdx];
        if (nowEnemy !== undefined && nowEnemy.time <= this.gameTimer) {
            this.getOrCreateEnemy(nowEnemy.data);
            this.stageIdx++;
        }

        this.playerBulletList.forEach(b => b.update(delta));
        this.enemyList.forEach(e => e.update(delta));

        this.playerBulletList.filter(b => b.active).forEach(b => {
            if (!b.isEnemy) {
                this.enemyList.filter(e => e.active).forEach(e => {
                    if (e.checkCollision(b.x, b.y, b.r)) {
                        e.setDamage(b.damage);
                        b.active = false;
                    }
                });
            } else {
                if (this.player.active) {
                    if (this.player.checkCollision(b.x, b.y, b.r)) {
                        this.player.setDamage(b.damage);
                        b.active = false;
                    }
                }


                //적총알이 플레이어에 충돌했는지를 검사
            }
        });

        this.enemyList.filter(x => x.active).forEach(enemy => {
            if (this.player.checkCrash(enemy.x, enemy.y, enemy.w, enemy.h)) {
                this.player.setDamage(200);
                this.life = 0;
            }
        });


        this.expList.forEach(e => e.update(delta));
    }






    render() {
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.backList.forEach(back => back.render(this.ctx));
        this.player.render(this.ctx);
        this.playerBulletList.forEach(b => b.render(this.ctx));
        this.enemyList.forEach(e => e.render(this.ctx));
        this.expList.forEach(e => e.render(this.ctx));
        // this.playerBulletList.forEach(b =>{
        //     if(){
        //         b.render(this.ctx, this.color = red , this )
        //     }else{

        //         b.render(this.ctx, this.color = yellow, this )
        //     }
        // });

        // this.enemyList.filter(x => x.active).forEach(enemy => {
        //     this.player.checkCrash(enemy.x, enemy.y, enemy.w, enemy.h, this.ctx);
        // });
    }

}