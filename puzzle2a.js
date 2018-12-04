const input = require('./input/puzzle2a_input.json');

function count_letters(string, minimum_count){
	return new Promise(function(resolve, reject){
		const letter_count = {};
		for (let i = 0; i < string.length; i++) {
			const element = string.charAt(i);
			if (element in letter_count) {
				letter_count[element]++;
			} else {
				letter_count[element] = 1;
			}
		}
		for(let key in letter_count){
			const letter = letter_count[key];
		
			if (letter == minimum_count) {
				resolve(true);
			}
		};

		resolve(false);
	});
}

function get_checksum_values(input){
	return new Promise((resolve, reject)=>{
		const twos = [];
		const threes = [];
		for (let i = 0; i < input.length; i++) {
			const string = input[i];
			twos.push(count_letters(string, 2))
			threes.push(count_letters(string, 3));
		}

		Promise.all(twos).then((two_vals)=>{
			let two_count = 0
			for (let t = 0; t < two_vals.length; t++) {
				if(two_vals[t]){
					two_count++;
				}
			}
			console.log(two_count);
			Promise.all(threes).then((three_vals)=>{
				let three_count= 0
				for (let t = 0; t < three_vals.length; t++) {
					if(three_vals[t]){
						three_count++;
					}
				}
				console.log(three_count);
				resolve(two_count * three_count);
			});
		}).catch((err)=>{
			console.log(err);
		});
		
	});

}
get_checksum_values(input).then((res)=>{
	console.log(res);

});