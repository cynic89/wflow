/**
 * Created by Cynic
 */
var Workflow = require('workflow');
var rulesMod = require('./rules');
var events = require('events');

function Climb() {
    Workflow.call(this);
    this.rules = rulesMod.climb;

    this.addRule('step1', function (ctx, next) {
        console.log('Climbing Step1 with energy ' + ctx.energy);
        ctx.energy = ctx.energy / 2;
        next();
    });

    this.addRule('step2', function (ctx, next) {
        console.log('Climbing Step2 with energy ' + ctx.energy);
        ctx.energy = ctx.energy / 2;
        next();
    });

    this.addRule('step3', function (ctx, next) {
        console.log('Climbing Step3 with energy ' + ctx.energy);
        ctx.energy = ctx.energy / 2;
        next();

    });


    this.addRule('step4', function (ctx, next) {
        console.log('Climbing Step4 with energy ' + ctx.energy);
        ctx.energy = ctx.energy / 2;
        next();
    });

    return this;
}


Climb.prototype = Object.create(Workflow.prototype);

module.exports = exports = new Climb();
