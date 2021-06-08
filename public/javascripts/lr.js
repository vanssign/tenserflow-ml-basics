const { text } = require("express");

let x_vals = [];
let y_vals = [];

let m, b;

const learning_rate = 0.5;

function mapX(val) {
    return map(val, 0, width, 0, 1)
}
function demapX(val) {
    return map(val, 0, 1, 0, width)
}

function mapY(val) {
    return map(val, 0, height, 1, 0)
}
function demapY(val) {
    return map(val, 1, 0, 0, height)
}

const opt = tf.train.sgd(learning_rate);

function setup() {
    createCanvas(screen.width*95/100, screen.height*13/20);
    background(0);
    m = tf.scalar(random(1)).variable();
    b = tf.scalar(random(1)).variable();
}

function loss(guess, actualVal) {
    return guess.sub(actualVal).square().mean();
}

function mousePressed() {
    let x = mapX(mouseX);
    let y = mapY(mouseY);
    x_vals.push(x);
    y_vals.push(y);
}

function predict(x) {
    const xs = tf.tensor1d(x);
    // y = mx + b;
    const ys = xs.mul(m).add(b);
    return ys;
}


function draw() {

    tf.tidy(()=>{
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);
            opt.minimize(() => loss(predict(x_vals), ys));
        }
        else{
            stroke(255);
            textSize(32)
            text("LOADING DATA",width/2,height/2)
        }
    
        background(0);
        stroke(255);
        strokeWeight(7);
        for (let i = 0; i < x_vals.length; i++) {
            let px = demapX(x_vals[i]);
            let py = demapY(y_vals[i]);
            point(px, py);
        }
    
        const yEndPoints = predict([0, 1]);
        let liney = yEndPoints.dataSync();
        strokeWeight(3);
        line(demapX(0), demapY(liney[0]), demapX(1), demapY(liney[1]))
    })
}