ig.module('game.entities.labguy')
    .requires(
        'plusplus.abstractities.creature',
        'plusplus.abilities.melee',
        'plusplus.helpers.utils'
)
    .defines(function() {
        'use strict';

        var _ut = ig.utils;

        ig.EntityLabguy = ig.global.EntityLabguy = ig.Creature.extend({

            size: {
                x: 8,
                y: 8
            },

            canFlipY: true,

            maxVelGrounded: {
                x: 50,
                y: 50
            },

            canBeSetOnFire: true,

            onFire: false,


            animsExpected: [
                "idle",
                "move",
                "melee"
            ],

            animSheet: new ig.AnimationSheet("media/labguy.png", 8, 8),
            animInit: "idleX",
            animSettings: {
                idleX: {
                    sequence: [0],
                    frameTime: 0.1
                },
                idleY: {
                    sequence: [1],
                    frameTime: 0.1
                },
                moveX: {
                    sequence: [6, 7],
                    frameTime: 0.1
                },
                moveY: {
                    sequence: [8, 9],
                    frameTime: 0.1
                },
                onFireX: {
                    sequence: [12, 13],
                    frameTime: 0.05
                },
                onFireY: {
                    sequence: [14, 15],
                    frameTime: 0.05
                },
                meleeX: {
                    sequence: [18, 19],
                    frameTime: 0.05,
                },
                meleeY: {
                    sequence: [20, 21],
                    frameTime: 0.05,
                },
                meleeOnFireX: {
                    sequence: [24, 25],
                    frameTime: 0.05,
                },
                meleeOnFireY: {
                    sequence: [26, 27],
                    frameTime: 0.05,
                }
            },

            health: 10,

            deathSettings: {
                spawnCountMax: 3,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.RED
                }
            },

            canWanderX: true,
            canWanderY: true,

            // instead of switching wander direction
            // when hitting a wall, lets switch at random also

            wanderSwitchChance: 0.005,
            wanderSwitchChanceStopped: 0.015,

            tetherDistance: 8,

            // don't notice prey too far away

            reactionDistance: 75,

            moveToPreySettings: {
                searchDistance: 150
            },

            screamSounds: [
                new ig.Sound('media/scream1.*'),
                new ig.Sound('media/scream2.*'),
            ],

            initProperties: function() {

                this.parent();

                this.melee = new ig.AbilityMelee(this, {
                    // target will be provided by attack method
                    canFindTarget: false,
                    // one shot kill player
                    damage: 1,
                    // shorter range than melee default
                    // about half of character width
                    rangeX: this.size.x * 0.5,
                    rangeY: this.size.y * 0.5
                });

                this.abilities.addDescendants([
                    this.melee
                ]);

                this.screamSounds[0].volume = 0.3;
                this.screamSounds[1].volume = 0.3;

            },

            initTypes: function() {

                this.parent();

                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

                _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");

                _ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");

                _ut.addType(ig.EntityExtended, this, 'preyGroup', "FRIEND", "GROUP");

            },

            attack: function(entity) {

                this.melee.setEntityTarget(entity);

                if (this.melee.entityTarget) {

                    var closeEnough = this.melee.closeEnough();

                    this.melee.activate();

                    return closeEnough;

                } else {

                    // the original attack method does a basic distance check

                    return this.parent();

                }

            },

            setOnFire: function() {

                if (!this.onFire) this.screamSounds[Math.random() < .5 ? 1 : 0].play();

                this.onFire = true;

            },

            update: function() {

                //if (this.onFire) this.receiveDamage(0.05, ig.game.getPlayer());

                this.parent();

            },

            kill: function() {

                //this.screamSounds[Math.random() < .5 ? 1 : 0].play();

                this.parent();

            },

            updateCurrentAnim: function() {

                if (this.onFire) {

                    this.currentAnim = this.anims[this.getDirectionalAnimName("onFire")];

                } else {

                    this.parent();

                }

            }

        });

    });