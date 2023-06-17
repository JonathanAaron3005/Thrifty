const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: String
})

var Role = mongoose.model('Role', roleSchema);

(["seller", "buyer"]).forEach(element => {
    if (Role.findOne({name: element}) == null) {
        Role.create({name: element});
        console.log("Missing role: " + element + ", making it now.")
    }
});

module.exports = Role
