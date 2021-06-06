// Daniel Shiffman
// http://codingtra.in

// XOR
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS

let model;
let resolution = 50;
let cols, rows;
let xs;
let inputs = [];

const train_xs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const train_ys = [[0], [1], [1], [0]]

const trainXs = tf.tensor(train_xs);
const trainYs = tf.tensor(train_ys);

function setup() {
    createCanvas(500, 500);
    cols = width / resolution;
    rows = height / resolution;
    model = tf.sequential();
    const hiddenLayer = tf.layers.dense({
        units: 4,
        activation: 'sigmoid',
        inputShape: [2]
    });
    const outputLayer = tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
    });
    model.add(hiddenLayer);
    model.add(outputLayer);

    const opt = tf.train.adam(0.8)

    //compile the model
    model.compile({
        optimizer: opt,
        loss: "meanSquaredError",
    });

    //prepar input
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;
            let x2 = j / rows;
            inputs.push([x1, x2]);
            stroke(255);
        }
    }
    xs = tf.tensor2d(inputs);

    setTimeout(train, 10)

}


function train() {
    trainModel().then(result => {
        console.log(result.history.loss[0]);
        setTimeout(train, 10);
    });
}

function trainModel() {
    return model.fit(trainXs, trainYs, {
        shuffle: true,
        epochs: 1
    });
}


function draw() {
    background(0);
    cols = width / resolution;
    rows = height / resolution;


    tf.tidy(() => {
        let ys = model.predict(xs);
        let y_values = ys.dataSync();
        let index = 0;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let br = y_values[index] * 255
                fill(br);
                rect(i * resolution, j * resolution, resolution, resolution);
                fill(255 - br);
                textSize(16);
                textAlign(CENTER, CENTER);
                text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)
                index++;
            }
        }
    })
}