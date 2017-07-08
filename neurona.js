var Math = require('mathjs');



var feedForward = function(bytes, weights){
    var output = 0;
    bytes.map((byte, i)=>{
        output += byte * weights[i]
    });
    return output;
};

var actionFunction = function(output){
    return 1.0 / (1 + Math.exp(-output));
}

var hiddenActionFunction = (output) => {
    return output > 0.5? 1:0;
}

var dsigmoid = function(output){
    return output*(1-output);
}

var backPropagation = function(error, input, weights, output){
    const learningRate = 0.3;
    var outputDelta = error * dsigmoid(output);
    return weights = weights.map((weight,i) => {
        return weight + (input[i] * outputDelta * learningRate);
    });
}

var trainPerceptron = function(trainingMatrix, classes){
    var weights = trainingMatrix[0].map((train) => {
        return -0.1+ 0.2 * Math.random();
    });
    var hits = 0;
    var actual = 0;
    while (trainingMatrix.length > hits) {
        trainingMatrix.map((trainingVector, i) => {
            var output = feedForward(trainingVector, weights);
            var af = actionFunction(output);
            var expectedOutput = classes[i] == 1 ? 0.75:0.24;
            var error = expectedOutput - output;
            if(Math.abs(error) < 0.25){
                hits += 1;
            } else{
                weights = backPropagation(error, trainingVector, weights, af);
                hits = 0;
            }
        });
        if (actual >= 200){
            break;
        } else{
            actual++;
            console.log((actual/2) + '%');
        }

    }
    return weights;
}

module.exports = {
    feedForward,
    actionFunction,
    trainPerceptron,
}