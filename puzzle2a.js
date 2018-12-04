const input = require('./input/puzzle2a_input.json');

function count_letters(string, minimum_count){
	return new Promise(function(resolve, reject){
		const letter_count = {};
		//loop through and count each occurence of each letter and save it in an object
		for (let i = 0; i < string.length; i++) {
			const element = string.charAt(i);
			if (element in letter_count) {
				letter_count[element]++;
			} else {
				letter_count[element] = 1;
			}
		}
		// see if any of the letters have a count equal to the minimum_count param
		// a separate for loop is used because you don't want to count false positives.
		for(let key in letter_count){
			const letter = letter_count[key];
		
			if (letter == minimum_count) {
				// call promise resolve method to exit the loop and return the boolean.
				resolve(true);
			}
		};

		resolve(false);
	});
}

function get_checksum(input){
	return new Promise((resolve, reject)=>{
		const twos = [];
		const threes = [];
		// set up all the count_letter promises
		for (let i = 0; i < input.length; i++) {
			const string = input[i];
			twos.push(count_letters(string, 2))
			threes.push(count_letters(string, 3));
		}

		Promise.all(twos).then((two_vals)=>{
			// when all the 2 letter promises return count how many trues you have
			let two_count = 0
			for (let t = 0; t < two_vals.length; t++) {
				if(two_vals[t]){
					two_count++;
				}
			}
			console.log(two_count);
			Promise.all(threes).then((three_vals)=>{
				// when all the 3 letter promises return count how many trues you have
				let three_count= 0
				for (let t = 0; t < three_vals.length; t++) {
					if(three_vals[t]){
						three_count++;
					}
				}
				console.log(three_count);
				// we have all the counts therefore resolve with the checksum
				resolve(two_count * three_count);
			});
		}).catch((err)=>{
			console.log(err);
		});
		
	});

}

get_checksum(input).then((res)=>{
	console.log("Checksum: ", res)
});