const input = require('./input/puzzle2a_input.json');


function LevenshteinDistance(string1, string2) {
    // using the Wagner-Fischer algorithm
    // set each element in distance to 0
    const distance = getDistanceMatrix(string1, string2);
    for (let j = 1; j <= string1.length; j++) {
        for (let k = 1; k <= string2.length; k++) {
            
            if (string1.charAt(k) == string2.charAt(j)) {
                distance[j][k] = distance[j-1][k-1]
            } else{
                distance[j][k] = Math.min(distance[j-1][k] + 1,  // a deletion
                                            distance[j][k-1] + 1,  // an insertion
                                            distance[j-1][k-1] + 1 // a substitution
                                            );
            }
        }
    }
    return distance;
}

function getDistanceMatrix(s1, s2) {
    const d = []
    for (let row = 0; row <= s1.length; row++) {
        d[row] = []
        for (let col = 0; col <= s2.length; col++) {
            if (row > 0 && col == 0) {
                d[row][col] = row;
            }else if (row == 0 && col > 0){
                d[row][col] = col;
            } else{
                d[row][col] = 0
            }
        }
    }
    return d;
}


function puzzle2b(input) {
    for (let i = 0; i < input.length; i++) {
        for (let n = 0; n < input.length; n++) {
        
            const d = LevenshteinDistance(input[i], input[n]);
            if(d[input[i].length][input[n].length] == 1){
                return [input[i], input[n]];
            }
        }
    }
}

console.log(puzzle2b(input));


