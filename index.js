const express = require('express')
const app = express()
const port = 8080

var db = require('./database.js')

app.use(express.json())

app.listen(
    port,
    () => console.log(`it's alive on port: ${port}`)
)

app.get('/', (req, res) => {
    res.status(200).send({
        h: "uuu",
        j: 55
    })
})

app.post('/:id', (req,res) => {
    const {id} = req.params
    const {logo} = req.body
    if(!logo){
        res.status(418).send({msg: "We need a logo"})
    }

    res.send({
        works: `hhhoiii ${id}`
    })
})

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

app.use(function(req, res){
    res.status(404);
});