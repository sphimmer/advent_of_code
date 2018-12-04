const input = require('./input/puzzle2a_input.json');


function LevenshteinDistance(string1, string2) {
	// using the Wagner-Fischer algorithm
	// set each element in distance to 0
	const distance = getDistanceMatrix(string1, string2);
	for (var j = 1; j <= string1.length; j++) {
		for (var k = 1; k <= string2.length; k++) {
			
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
	return distance[string1.length][string2.length]
}

function getDistanceMatrix(s1, s2) {
	const d = []
	for (var row = 0; row <= s1.length; row++) {
		d[row] = []
		for (var col = 0; col <= s2.length; col++) {
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
	input.forEach((i)=>{
		for (var n = 0; n < input.length; n++) {
			if (i != input[n]) {
				if(LevenshteinDistance(i, input[n]) == 1){
					console.log(i,input[n]);
				}
			}
			
		}
	});
}

puzzle2b(input);


