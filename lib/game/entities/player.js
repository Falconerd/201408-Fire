ig.module('game.entities.player')
    .requires(
        'plusplus.abstractities.player',
        'game.abilities.flame-thrower',
        'plusplus.entities.camera-atmosphere',
        'plusplus.abilities.glow'
)
    .defines(function() {

        ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

            size: {
                x: 8,
                y: 8
            },

            canFlipY: true,

            maxVelGrounded: {
                x: 50,
                y: 50
            },

            animSheet: new ig.AnimationSheet("media/player.png", 8, 8),
            animInit: "idleX",
            animSettings: {
                idleX: {
                    sequence: [0],
                    frameTime: 0.1
                },
                moveX: {
                    sequence: [0],
                    frameTime: 0.1
                },
                idleY: {
                    sequence: [1],
                    frameTime: 0.1
                },
                moveY: {
                    sequence: [1],
                    frameTime: 0.1
                }
            },

            health: 10,
            energy: 10,

            regen: true,
            regenHealth: false,
            regenRateEnergy: 0.1,

            glowSettings: {
                // these directly correlate
                // to ig.Entity light properties
                light: {
                    // the light should move with player
                    performance: 'movable',
                    // cast shadows only on static entities
                    castsShadows: true,
                    castsShadowsMovable: true,
                    r: 1,
                    g: .8,
                    b: .2,
                    alpha: 1,
                }
            },

            initProperties: function() {

                this.parent();

                this.glow = new ig.AbilityGlow(this);
                this.shoot = new ig.FlameThrower(this);
                this.abilities.addDescendants([
                    this.glow, this.shoot
                ]);

                this.atmosphere = ig.game.spawnEntity(ig.EntityCameraAtmosphere, 0, 0, {

                    atmosphereSettings: {
                        r: 0,
                        g: 0,
                        b: 0,
                        alpha: 0.5
                    },
                    atmosphereFadeDuration: 0,
                    lightsCutout: true,
                    lightAmplification: 2,

                });
                this.atmosphere.activate();

            },

            handleInput: function() {

                var shootX;
                var shootY;

                // check if shooting

                if (ig.input.state('shoot')) {

                    if (this.facing.x !== 0) {

                        shootX = this.facing.x > 0 ? this.pos.x + this.size.x : this.pos.x;

                    } else {

                        shootX = this.pos.x + this.size.x * 0.5;

                    }

                    if (this.facing.y !== 0) {

                        shootY = this.facing.y > 0 ? this.pos.y + this.size.y : this.pos.y;

                    } else {

                        shootY = this.pos.y + this.size.y * 0.5;

                    }

                    this.shoot.activate({
                        x: shootX,
                        y: shootY
                    });

                }

            }

        });

    });