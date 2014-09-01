ig.module('game.main')
    .requires(
        'plusplus.core.plusplus',
        'game.levels.one',
        'game.levels.two'
)
    .defines(function() {
        'use strict';

        var inferno = ig.GameExtended.extend({

            init: function() {

                this.parent();

                this.loadLevel(ig.global.LevelOne);

            },

            inputStart: function() {
                this.parent();
                ig.input.bind(ig.KEY.SPACE, 'shoot');
            },
            inputEnd: function() {
                this.parent();
                ig.input.unbind(ig.KEY.SPACE, 'shoot');
            },

            // convert the collision map shapes
            // either or both can be removed
            shapesPasses: [
                // for climbing
                // we ignore solids and one ways
                // to only retrieve climbable areas
                {
                    ignoreSolids: true,
                    ignoreOneWays: true
                },
                // for lighting and shadows
                // we ignore climbables and the edge boundary
                {
                    ignoreClimbable: true,
                    // throw away the inner loop of the edge of the map
                    discardBoundaryInner: true,
                    // throw away the outer loop of the edge of the map
                    retainBoundaryOuter: false
                }
            ]

        });

        ig.main('#canvas', inferno, 60, 160, 120, 2, ig.LoaderExtended);

    });