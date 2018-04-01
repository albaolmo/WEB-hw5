var crypto = require("crypto");
 
module.exports = function computeWeakETag(customers) {
    var content = "";
    for (var i = 0; i < customers.length; i++){
        content += customers[i].id + customers[i].name;
    }  
    return crypto.createHash('md5').update(content).digest("hex");
};

module.exports = function computeStrongETag(customers) {
    var content = "";
    for (var i = 0; i < customers.length; i++){
        content += customers[i].id + custumers[i].name;
        for(var j = 0; j < custumers[i].orders.length; i++){
             content += custumers[i].orders[j].id;
        }
    }
    return crypto.createHash('md5').update(content).digest("hex");
};
