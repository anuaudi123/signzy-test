const express = require('express');
const cors = require('cors');
var fs = require('fs');

var jsondb = fs.readFileSync('./src/db.json');
var newDB = JSON.parse(jsondb);
let port = process.env.PORT || 8080;
let app = express();

app.listen(port, console.log("server running on ", port));

app.use(cors());

let handleOperation = async (type, operation) => {
    //Use this function to identify API call to make depends on which type of Appliance it is and operation.
    return { "msg": " success" };
}

let addMachine = (req, res) => {
    let { type, brand } = req.params;
    console.log('----------------', newDB)
    newDB.push({ "type": type, "brand": brand });
    fs.writeFile('./src/db.json', JSON.stringify(newDB), (err => {
        if (err) console.log(err)
    }));

    res.send({ msg: "success" });
}


let removeMachine = (req, res) => {
    let { type } = req.params;
    console.log('newdb', newDB)
    var filtered = newDB.filter(function (item) {
        return item.type !== type;
    });
    newDB = filtered;
    console.log('filterd', filtered)
    fs.writeFile('./src/db.json', JSON.stringify(filtered), (err => {
        if (err) console.log(err)
    }));

    res.send({ msg: "success" });
}



app.post('/removemachine/:type', removeMachine)
app.post('/addmachine/:type/:brand', addMachine);


app.get('/command/:type/:operation', async (req, res) => {
    let { type, operation } = req.params;
    let response = await handleOperation(type, operation);
    res.send(response);
});

