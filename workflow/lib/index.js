/**
 * Created by Cynic
 */
var events = require('events');


function Workflow() {
    events.EventEmitter.call(this);
    this.rules = [];
};

Workflow.prototype.addRule = function (name, rule) {
    if (!this.hasOwnProperty(name)) {
        if (typeof rule != 'function') {
            console.log('rule ' + name + ' must be a function. Instead its a type ,' + toString.call(rule));
        }
        else {
            this[name] = rule;
        }
    }
    else {
        if (typeof rule == 'function') {
            console.log("rule already exists " + name);
        }
        else {
            console.log("Another property exists with the same name " + name);
        }
    }

};


Workflow.prototype.run = function (ctx) {
    var that = this;
    var index = 0;
    (function next(err) {
        if (err) {
            that.emit('error', err, ctx);
        }
        else {

            if (index >= that.rules.length) {
                that.emit('done', ctx);
            }
            else {
                if (index > 0) {
                    that.emit('post', that.rules[index]);
                }
                that.execRule(that.rules[index++], ctx, next);
            }
        }
    })();
}

Workflow.prototype.execRule = function (name, ctx, next) {

    if (this.hasOwnProperty(name)) {
        try {
            this.emit('pre', name);
            this[name].call(this, ctx, next);
        }
        catch (err) {
            console.log('error ' + err);
        }
    }
    else {
        console.log('Rule does not exist ' + name);
    }
};

Workflow.prototype.__proto__ = events.EventEmitter.prototype;

var workflow = module.exports = exports = Workflow;

