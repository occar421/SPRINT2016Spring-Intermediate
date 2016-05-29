/**
 * Bot
 */
 class Bot {
	 command: string;
	 data: string;
	 hash: string;
	 
	constructor(parameters) {
		this.command = parameters["command"];
		this.data = parameters["data"];
	}
	
	generateHash(){
		var com_buf = "";
		for (var i = 0; i < this.command.length; i++) {
			com_buf += this.command.charCodeAt(i).toString();
		}
		let commandAscii = parseInt(com_buf);
		let extractedCommand = scientificNotation(commandAscii);
		
		var dat_buf = "";
		for (var i = 0; i < this.data.length; i++) {
			dat_buf += this.data.charCodeAt(i).toString();
		}
		let dataAscii = parseInt(dat_buf);
		let extractedData = scientificNotation(dataAscii);
		
		this.hash = (extractedCommand + extractedData).toString(16);
	}
}

// Convert the number into scientific notation with 16 digits after "."
// If power of e is greater than 20, get the number between "." and "e"
// Else return the number itself
function scientificNotation(num: number): number {
	let data = num.toExponential(16);
	let elements = data.split("e+");
	let power = parseInt(elements[1]);
	let result = (power > 20) ? parseInt(elements[0].split(".")[1] + power.toString()) : num;
	return result;
}

export = Bot;