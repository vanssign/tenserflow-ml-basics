//m=E (x-xm)(y-ym)/ E (x-xm)^2
//m=r(Sy/Sx) r is corrrleation b/w x and y, sx and sy are the standard deviations

//b=ym-m*xm

// Ancombe Plots

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

var data = [];
var m = 1;
var b = 0;
var learning_rate=0.01;
function setup() {
    createCanvas(400, 400);
}

function mousePressed() {
    var x = mapX(mouseX);
    var y = mapY(mouseY);

    var point = createVector(x, y);
    data.push(point);
}

function predict(x) {
    const y = m * x + b;
    return y;
}

function gd() {
    //stochiastic gd: one by one error and reducing
    for(var i in data){
        var x=data[i].x;
        var y=data[i].y;

        var guess=m*x+b;

        var error=y-guess;

        m=m+x*error*learning_rate;
        b=b+error*learning_rate;
    }

}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(7);
    for (var i in data) {
        var x = demapX(data[i].x);
        var y = demapY(data[i].y);
        point(x, y);
    }

    strokeWeight(3);
    if (data.length > 1) {
        gd();
        line(demapX(0), demapY(predict(0)), demapX(1), demapY(predict(1)));
    }
}