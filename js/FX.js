// a very simple particle system that rotates scales and fades sprites
// made by McFunkypants for Dream Racer, a gamekdo.com club project!

function fxSystem() { // class constructor

    var particle = [];
    const SPEED_X_RANDOMNESS = 1;
    const SPEED_Y_RANDOMNESS = 4;
    const ALPHA_SCALE = 0.7; // max opacity

    this.add = function (x, y, sprite, life, size, color, minSpeedX, maxSpeedX, minSpeedY, maxSpeedY) {

        //console.log('fx add ' + x + ',' + y);

        var p, pnum, pcount;
        for (pnum = 0, pcount = particle.length; pnum < pcount; pnum++) {
            p = particle[pnum];
            if (p && p.inactive) { break; } // found one we can reuse
        }

        // we need a new explosion!
        if (!p || !p.inactive) {
            //console.log('No inactive explosions. Adding explosion #' + pcount);
            var newParticle = { inactive: true };
            // remember this new explosion in our system and reuse
            particle.push(newParticle);
            p = newParticle;
        }

        if (p && p.inactive) {
            p.x = x;
            p.y = y;
            if (minSpeedX == undefined) { // default speed
                p.xspd = (Math.random() - 0.5) * SPEED_X_RANDOMNESS;
                p.yspd = (Math.random() - 0.5) * SPEED_Y_RANDOMNESS;
            } else { // random within a range
                p.xspd = minSpeedX + (Math.random() * (maxSpeedX - minSpeedX));
                p.yspd = minSpeedY + (Math.random() * (maxSpeedY - minSpeedY));
            }
            p.inactive = false;
            p.sprite = sprite;
            p.size = size;
            p.life = life;
            p.birth = (new Date()).getTime();
            p.death = p.birth + life;
            p.color = color;
            p.angle = 0;
            p.alpha = ALPHA_SCALE;
            p.rotSpd = Math.random() * 3 - 2;
        }

    }

    this.update = function () {

        //console.log("fx update!");

        // get the current time
        var timestamp = (new Date()).getTime();

        particle.forEach(
            function (p) {
                if (!p.inactive) {

                    p.age = timestamp - p.birth;
                    //console.log('particle age: ' + p.age);
                    var lifePercent = clamp(p.age / p.life, 0, 1);
                    //console.log('particle lifepercent: ' + lifePercent);

                    //console.log('p.death: ' + p.death);
                    //console.log('timestamp: ' + timestamp);

                    p.scale = p.size * lifePercent; // grow
                    p.alpha = (1 - lifePercent) * ALPHA_SCALE; // fade
                    p.angle = Math.PI * 2 * lifePercent * p.rotSpd;

                    p.x += p.xspd;
                    p.y += p.yspd;

                    if (timestamp >= p.death) // die
                    {
                        //console.log('particle died of old age');
                        p.inactive = true;
                    }

                }
            });

    }

    this.draw = function () {

        //console.log("fx draw!");

        var drew = 0;

        particle.forEach(
            function (p) {
                if (!p.inactive) // and visible in screen bbox
                {
                    drew++;
                    //drawImageRotatedAlpha(
                    drawImageTinted(
                        canvasContext,
                        p.sprite,
                        p.x,
                        p.y,
                        p.angle,
                        p.color,
                        p.alpha);
                }
            }
        );
        //console.log('drew'+drew);
    }

    // helper function (inclusive: eg 1,10 may include 1 or 10)
    function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    this.dirt = function (car) {

        const OFFROAD_DIRT_CHANCE = 0.1;
        const OFFROAD_DIRT_LIFESPAN = 1000;
        const OFFROAD_DIRT_SIZE = 32;
        const OFFROAD_DIRT_COLOR = 'rgba(117,76,36,1)'; // brown
        const XMINS = -2; // speeds
        const XMAXS = 2;
        const YMINS = 0;
        const YMAXS = 6;


        if (Math.random() < OFFROAD_DIRT_CHANCE) { // so it doesn't add one every single frame
            // front left tire    
            this.add(
                car.position.x + 16,
                car.position.y + 16,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE, OFFROAD_DIRT_COLOR,
                XMINS, XMAXS, YMINS, YMAXS
            );
            // front right tire    
            this.add(
                car.position.x + 128,
                car.position.y + 16,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE, OFFROAD_DIRT_COLOR,
                XMINS, XMAXS, YMINS, YMAXS
            );
            // back left tire    
            this.add(
                car.position.x + 16,
                car.position.y + 128,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE, OFFROAD_DIRT_COLOR,
                XMINS, XMAXS, YMINS, YMAXS
            );
            // back right tire    
            this.add(
                car.position.x + 128,
                car.position.y + 128,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE, OFFROAD_DIRT_COLOR,
                XMINS, XMAXS, YMINS, YMAXS
            );
        }
    }

    this.exhaust = function (car) {

        const EXHAUST_X = 32;
        const EXHAUST_Y = 120;
        const EXHAUST_COLOR = "rgba(0,0,0,0.1)";
        const EXHAUST_LIFESPAN = 700; // ms
        const EXHAUST_SIZE = 64;
        const EXHAUST_CHANCE = 0.5; // per frame chance a particle is spawned

        if (Math.random() < EXHAUST_CHANCE) // so it doesn't add one every single frame
            this.add(
                car.position.x + EXHAUST_X,
                car.position.y + EXHAUST_Y,
                particlePic,
                EXHAUST_LIFESPAN, EXHAUST_SIZE, EXHAUST_COLOR);
    }

    this.sparks = function (car) {
    }


};
