//build residual plot
// learning_rate based on number of data points
var ctx = document.getElementById('myChart').getContext('2d');
var myChart;
var activeCases = [];
var totalCases = [];
var deceasedCases = [];
var recoveredCases = [];
var dateLabels = [];
var next_date_container=document.getElementById("next_date_container")

fetch('https://api.rootnet.in/covid19-in/stats/history')
    .then((res) => {
        return res.json();
    }).then((resjson) => {
        end_date=resjson.data.length-1;
        for (i in resjson.data) {
            totalCases[i] = resjson.data[i].summary.total;
            recoveredCases[i] = resjson.data[i].summary.discharged;
            deceasedCases[i] = resjson.data[i].summary.deaths;
            activeCases[i] = totalCases[i] - recoveredCases[i] - deceasedCases[i];
            dateLabels[i] = resjson.data[i].day;
        }
        for (let i = 0; i + start_date < end_date; i++) {
            y_vals[i] = activeCases[i + start_date];
            x_vals[i] = i;
            date_vals[i] = dateLabels[i + start_date];
        }
        next_date_container.innerText=dateLabels[end_date];
        myChart = new Chart(ctx, {
            type:'bar',
            data: {
                datasets: [{
                    label: 'Actual Values',
                    data: y_vals,
                    // this dataset is drawn below
                    backgroundColor:'rgba(255, 205, 86, 0.2)',
                }, {
                    type: 'line',
                    label: 'Linear Regression Values',
                    data: y_vals,
                }],
                labels: date_vals
            },
        });
    });

let x_vals = [];
let y_vals = [];
let date_vals = [];
let chart_data = [];


let start_date = 462;
let end_date;
let m, b;

const learning_rate = 0.0005;

const opt = tf.train.sgd(learning_rate);

function setup() {
    noCanvas();
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

        tf.tidy(() => {
            const yEndPoints = predict(x_vals);
            const nextDay = predict([end_date - start_date + 1]);
            let liney = yEndPoints.dataSync();
            myChart.data.datasets[1].data = liney
            myChart.update();
            document.getElementById("prediction").innerText = nextDay.dataSync();
        })
    }
}
