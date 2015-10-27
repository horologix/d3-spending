var fs = require("fs");

var input = fs.readFileSync("culture_data.csv").toString().split("\n");
var output = [];

for(var i = 0; i < input.length; i++) {
    var s = input[i].split(",");
    var obj = {};
    obj["department"] = s[0];
    obj["vendor"] = s[1];
    obj["date"] = s[2];
    obj["price"] = s[3];
    obj["activity"] = s[4];
    obj["account"] = s[5];
    obj["type"] = s[6];
    output.push(obj);
}

fs.writeFileSync("data.json", JSON.stringify(output));
