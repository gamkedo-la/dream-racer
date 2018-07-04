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

    };

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
    };

    // helper function (inclusive: eg 1,10 may include 1 or 10)
    function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    this.dirt = function (car) {

        const OFFROAD_DIRT_CHANCE = 0.1;
        const OFFROAD_DIRT_LIFESPAN = 1000;
        const OFFROAD_DIRT_SIZE = 32;
        const OFFROAD_DIRT_COLOR1 = 'rgba(117,76,36,1)'; // brown
        const OFFROAD_DIRT_COLOR2 = 'rgba(20,255,20,1)'; // light green
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
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE,
                (Math.random() < 0.5 ? OFFROAD_DIRT_COLOR1 : OFFROAD_DIRT_COLOR2),
                XMINS, XMAXS, YMINS, YMAXS
            );
            // front right tire    
            this.add(
                car.position.x + 128,
                car.position.y + 16,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE,
                (Math.random() < 0.5 ? OFFROAD_DIRT_COLOR1 : OFFROAD_DIRT_COLOR2),
                XMINS, XMAXS, YMINS, YMAXS
            );
            // back left tire    
            this.add(
                car.position.x + 16,
                car.position.y + 128,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE,
                (Math.random() < 0.5 ? OFFROAD_DIRT_COLOR1 : OFFROAD_DIRT_COLOR2),
                XMINS, XMAXS, YMINS, YMAXS
            );
            // back right tire    
            this.add(
                car.position.x + 128,
                car.position.y + 128,
                particlePic,
                OFFROAD_DIRT_LIFESPAN, OFFROAD_DIRT_SIZE,
                (Math.random() < 0.5 ? OFFROAD_DIRT_COLOR1 : OFFROAD_DIRT_COLOR2),
                XMINS, XMAXS, YMINS, YMAXS
            );
        }
    };

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
                EXHAUST_LIFESPAN, EXHAUST_SIZE, EXHAUST_COLOR,
                -0.5, 0.5, 0, 4 // * this.speed?
            );
    };

    this.sparks = function (car) {
        for (let num = 0; num < 4; num++) {
            this.add(
                car.position.x + Math.random() * 80,
                car.position.y + Math.random() * 128,
                particlePic,
                //1000, 4, 'rgba(255,255,0,1)', // yellow
                600, 4, 'rgba(255,80,0,1)', // red
                Math.random() * -8,
                Math.random() * 8,
                Math.random() * -8,
                Math.random() * 8
            );
        }
    };

    this.smoke = function (car) {
        for (let num = 0; num < 4; num++) {
            this.add(
                car.position.x + Math.random() * 80,
                car.position.y + Math.random() * 128,
                particlePic,
                4000, 4, 'rgba(0,0,0,1)', // yellow
                Math.random() * -1,
                Math.random() * 1,
                Math.random() * -3,
                Math.random() * 0
            );
        }
    };

    this.boosterFX = function (car) {
        const BOOST_X1 = 16;    // back tires
        const BOOST_X2 = 128;
        const BOOST_Y = 128;
        const BOOST_WOBBLE = 6;
        for (let num = 0; num < 2; num++) {
            this.add(
                car.position.x + BOOST_X1 + ((Math.random() - 0.5) * BOOST_WOBBLE),
                car.position.y + BOOST_Y + ((Math.random() - 0.5) * BOOST_WOBBLE),
                particlePic,
                1000, 4, 'rgba(255,' + (Math.round(Math.random() * 255)) + ',40,1)',
                Math.random() * -2,
                Math.random() * 2,
                Math.random() * 0,
                Math.random() * 8
            );
            this.add(
                car.position.x + BOOST_X2 + ((Math.random() - 0.5) * BOOST_WOBBLE),
                car.position.y + BOOST_Y + ((Math.random() - 0.5) * BOOST_WOBBLE),
                particlePic,
                1000, 4, 'rgba(255,' + (Math.round(Math.random() * 255)) + ', 40, 1)',
                Math.random() * -2,
                Math.random() * 2,
                Math.random() * 0,
                Math.random() * 8
            );
        }
    };

};
