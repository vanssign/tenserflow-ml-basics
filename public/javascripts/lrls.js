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

function lr() {
    var xsum = 0;
    var ysum = 0;
    for (var i in data) {
        xsum += data[i].x;
        ysum += data[i].y;
    }
    var ymean = ysum / data.length;
    var xmean = xsum / data.length;
    var num = 0;
    var den = 0;
    for (var i in data) {
        num += (data[i].x - xmean) * (data[i].y - ymean);
        den += (data[i].x - xmean) * (data[i].x - xmean);
    }
    m = num / den;
    b = ymean - m * xmean;
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
        lr();
        line(demapX(0), demapY(predict(0)), demapX(1), demapY(predict(1)));
    }
}