var activeCases=[];
var totalCases=[];
var deceasedCases=[];
var recoveredCases=[];
var dateLabels=[];
fetch('https://api.rootnet.in/covid19-in/stats/history')
  .then((res)=> {
    return res.json();
  }).then((resjson)=> {
    for(i in resjson.data){
        totalCases[i]=resjson.data[i].summary.total;
        recoveredCases[i]=resjson.data[i].summary.discharged;
        deceasedCases[i]=resjson.data[i].summary.deaths;
        activeCases[i]=totalCases[i]-recoveredCases[i]-deceasedCases[i];
        dateLabels[i]=resjson.data[i].day;
    }
    for (let i = 0; i + start_date < end_date; i++) {
        y_vals[i] =activeCases[i + start_date] / 4000000;
        x_vals[i] = i;
    }
});

let x_vals = [];
let y_vals = [];

let start_date=432;
let end_date=452;
let m, b;

const learning_rate = 0.005;

function mapX(val) {
    return map(val, 0, width, 0, 50)
}
function demapX(val) {
    return map(val, 0, 50, 0, width)
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

function predict(x) {
    const xs = tf.tensor1d(x);
    // y = mx + b;
    const ys = xs.mul(m).add(b);
    return ys;
}


function draw() {
    background(0);
        if (x_vals.length > 0) {
            tf.tidy(() => {
            const ys = tf.tensor1d(y_vals);
            opt.minimize(() => loss(predict(x_vals), ys));
            })
        }
        else{
            textSize(16)
            text("Fetching Data",width/2,height/2)
            fill(255, 255, 255);
        }

        stroke('red');
        strokeWeight(4);
        for (let i = 0; i < x_vals.length; i++) {
            let px = demapX(x_vals[i]);
            let py = demapY(y_vals[i]);
            point(px, py);
        }
        tf.tidy(()=>{
            const yEndPoints = predict([0, 100]);
        const nextDay = predict([end_date-start_date+1]);
        let liney = yEndPoints.dataSync();
        stroke('white')
        strokeWeight(3);
        line(demapX(0), demapY(liney[0]), demapX(100), demapY(liney[1]))
        document.getElementById("prediction").innerText = nextDay.dataSync() * 4000000;
        })
}