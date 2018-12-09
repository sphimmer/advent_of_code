const input = require('./input/puzzle2a_input.json');

// uses levenshtein distance to see how different the stings are.
// more complex, still fast, but allows for more use cases like if the strings
// are different lengths.
function LevenshteinDistance(string1, string2) {
    // using the Wagner-Fischer algorithm
    // set each element in distance to 0
    const distance = getDistanceMatrix(string1, string2);
    for (let j = 1; j <= string1.length; j++) {
        for (let k = 1; k <= string2.length; k++) {
            
            if (string1[k] == string2[j]) {
                distance[j][k] = distance[j-1][k-1]
            } else{
                distance[j][k] = Math.min(distance[j-1][k] + 1,  // a deletion
                                            distance[j][k-1] + 1,  // an insertion
                                            distance[j-1][k-1] + 1 // a substitution
                                            );
            }
        }
    }
    return distance[string1.length][string2.length];
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

// simple solution that works for this data set
// only works if strings are same length
function getCommonLetters(s1, s2) {
    let result_string = ""
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] == s2[i]) {
            result_string += s1[i];
        }
    }
    return result_string;
}

function puzzle2b_simple(input) {
    for (let i = 0; i < input.length; i++) {
        for (let n = 0; n < input.length; n++) {
            
            const letters = getCommonLetters(input[i], input[n]);
            if (letters.length == input[i].length -1){
                return letters;
            }
        }
    }
}

function puzzle2b_levenshtein(input) {
    for (let i = 0; i < input.length; i++) {
        for (let n = 0; n < input.length; n++) {
            
            if (LevenshteinDistance(input[i], input[n]) == 1){
                return getCommonLetters(input[i], input[n]);
            }
        }
    }
}

console.log(puzzle2b_simple(input));
console.log(puzzle2b_levenshtein(input));

