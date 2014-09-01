ig.module('game.entities.flame')
    .requires(
        'plusplus.abstractities.projectile'
)
    .defines(function() {

        ig.EntityFlame = ig.global.EntityFlame = ig.Projectile.extend({

            collides: ig.EntityExtended.COLLIDES.LITE,
            size: {
                x: 4,
                y: 4
            },
            offset: {
                x: 2,
                y: 2
            },

            canFlipY: true,

            damage: 0.1,
            lifeDuration: 0.5,
            friction: {
                x: 0,
                y: 0
            },
            bounciness: 0,
            collisionKills: true,

            animSheet: new ig.AnimationSheet('media/flame.png', 8, 8),
            animInit: "moveX",
            animSettings: {
                moveX: {
                    sequence: [0],
                    frameTime: 1
                },
                moveY: {
                    sequence: [1],
                    frameTime: 1
                },
                deathX: {
                    sequence: [1],
                    frameTime: 0.05
                },
                deathY: {
                    sequence: [1],
                    frameTime: 0.05
                }
            },

            /**
             * Checks projectile to see if has hit an entity of type {@link ig.EntityExtended.TYPE.DAMAGEABLE}.
             * @override
             */
            check: function(entity) {

                this.parent(entity);

                // deal damage to colliding entity

                var damage;

                if (this.damageAsPct) {

                    damage = entity.health * this.damage;

                } else {

                    damage = this.damage;

                }

                if (entity.canBeSetOnFire) {

                    if (!entity.onFire) {

                        entity.setOnFire();

                    }

                }

                entity.receiveDamage(damage, this, this.damageUnblockable);

                // kill self

                this.kill();

            }

        });

    });