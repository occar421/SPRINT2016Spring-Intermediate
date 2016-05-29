/**
 * Bot
 */
var Bot = (function () {
    function Bot(parameters) {
        this.command = parameters["command"];
        this.data = parameters["data"];
    }
    Bot.prototype.generateHash = function () {
        var com_buf = "";
        for (var i = 0; i < this.command.length; i++) {
            com_buf += this.command.charCodeAt(i).toString();
        }
        var commandAscii = parseInt(com_buf);
        var extractedCommand = scientificNotation(commandAscii);
        var dat_buf = "";
        for (var i = 0; i < this.data.length; i++) {
            dat_buf += this.data.charCodeAt(i).toString();
        }
        var dataAscii = parseInt(dat_buf);
        var extractedData = scientificNotation(dataAscii);
        this.hash = (extractedCommand + extractedData).toString(16);
    };
    return Bot;
})();
// Convert the number into scientific notation with 16 digits after "."
// If power of e is greater than 20, get the number between "." and "e"
// Else return the number itself
function scientificNotation(num) {
    var data = num.toExponential(16);
    var elements = data.split("e+");
    var power = parseInt(elements[1]);
    var result = (power > 20) ? parseInt(elements[0].split(".")[1] + power.toString()) : num;
    return result;
}
module.exports = Bot;
//# sourceMappingURL=bot.js.map