// function setup(){
//     noCanvas();
//     const values=[];
//     for(let i=0;i<15;i++){
//     values[i]=random(0,100);
//     }
//     const shape=[5,3];
//     //value,shape,dataType
//     const tense=tf.tensor(values,shape,"int32");
//     // tense.data().then(stuff=>console.log(stuff));
//     const tense2=tf.tensor(values,[3,5],"int32");
//     //use tf.variable to create mutable tensors
//     // const tensev=tf.variable(tense);
//     tense.print();
//     const tense3=tf.matMul(tense,tense2);
//     tense3.print();
//     //memory management
//     //use dispose to clear memory manually one at a time
//     //wrap a function in tidy to just clear stuff automatically
//     //inside tf.tidy use tf.keep to maintain tensor in memory

// }

const configHidden = {
    units: 4,
    activation: 'sigmoid',
    inputShape: [2]
}
const configOutput = {
    units: 1,
    activation: 'sigmoid',
}

const model = tf.sequential();
const hidden = tf.layers.dense(configHidden);
const output = tf.layers.dense(configOutput);
//add layers
model.add(hidden);
model.add(output);

const sgdOpt = tf.train.sgd(0.5);
const configModel = {
    optimizer: sgdOpt,
    loss: "meanSquaredError",
}
//compile the model
model.compile(configModel);

//train
const xs = tf.tensor2d([
    [0.25, 0.25],
    [0.55, 0.45],
    [0.25, 0.00],
])

const trainConfig = {
    shuffle: true,
    epochs:100
}

const ys = tf.tensor2d([
    [2.00],
    [1.00],
    [4.00],
])


async function train() {
    for (let i = 0; i < 100; i++) {
        let res = await model.fit(xs, ys, trainConfig);
        console.log(res.history.loss[0]);
    }
}

train().then(() => {
    console.log("training success");
    const pxs = tf.tensor2d([
        [0.25, 0.25],
        [0.55, 0.45],
        [0.25, 0.00],
    ]);
    model.predict(pxs).print();
});
