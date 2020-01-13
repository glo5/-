class Stage {
    constructor(gw, gh, imgs){

        this.stage1 = [
            {time:2, data:{k:"enemy", x:gw / 3 - 50, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:2, data:{k:"enemy", x:gw / 3 + 175, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:2, data:{k:"enemy", x:gw / 3 + 65, y: -40, w:60, h:60, img:imgs.enemy, s:70, v:new Vector(0, 1)}},
            {time:2, data:{k:"enemy", x:gw / 3 - 150, y: -40, w:60, h:60, img:imgs.enemy, s:90, v:new Vector(0, 1)}},
            {time:2, data:{k:"enemy", x:gw / 3 + 275, y: -40, w:60, h:60, img:imgs.enemy, s:90, v:new Vector(0, 1)}},   
            {time:4, data:{k:"enemy", x:gw / 3 - 95, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 + 225, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 + 135, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 + 65, y: -40, w:60, h:60, img:imgs.box, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 - 15, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 - 195, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},
            {time:4, data:{k:"enemy", x:gw / 3 + 335, y: -40, w:60, h:60, img:imgs.enemy, s:80, v:new Vector(0, 1)}},                         
            {time:8, data:{k:"enemy", x:-50, y:0, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(1, 1)}},
            {time:8, data:{k:"enemy", x:gw, y:0, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(-1, 1)}},
            {time:9, data:{k:"enemy", x:gw, y:0, w:80, h:60, img:imgs.enemy, s:80, v:new Vector(-1, 1)}},         
            {time:9, data:{k:"enemy", x:-50, y:0, w:80, h:60, img:imgs.enemy, s:80, v:new Vector(1, 1)}},
            {time:10, data:{k:"enemy", x:gw, y:0, w:100, h:80, img:imgs.enemy, s:80, v:new Vector(-1, 1)}},         
            {time:10, data:{k:"enemy", x:-50, y:0, w:100, h:80, img:imgs.enemy, s:80, v:new Vector(1, 1)}},
            {time:15, data:{k:"enemy", x: 60, y:80, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(1, 1)}},     
            {time:15, data:{k:"enemy", x: 90, y:0, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(1, 1)}},
            {time:15, data:{k:"enemy", x: -60, y:80, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(1, 1)}},     
            {time:15, data:{k:"enemy", x: -90, y:0, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(1, 1)}},
            {time:20, data:{k:"enemy", y:gh / 7 * 2 - 50, x: -40, w:60, h:40, img:imgs.enemy, s:100, v:new Vector(1, 0)}},    
            {time:20, data:{k:"enemy", y:gh / 7 * 2 + 50, x:  40, w:60, h:40, img:imgs.enemy, s:100, v:new Vector(1, 0)}},
            {time:28, data:{k:"enemy", x:gw / 2-40, y: -40, w:100, h:200 , img:imgs.boss, s:120, v:new Vector(0, 1)}},
            {time:34, data:{k:"boss", x:gw / 2-70, y: -40, w:180, h:280, img:imgs.boss, s:80, v:new Vector(0, 1)}},
        ];
        this.stage2 = [
            
            {time:2, data:{k:"enemy", x:gw / 3 - 50, y: -40, w:60, h:40, img:imgs.enemy, s:80, v:new Vector(0, 1)}}
        ]
    }
}