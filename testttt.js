const express = require("express");
const router = express.Router();
const app = express();

//yc data qua form
/*router.get("/search", (req,res) => {
    res.send(`
        <form method="post">
            <input type="text" name="txt"/>
            <input type="submit" name="sbm" value="Search"/>
        </form>
    `);
});

router.post("/search", (req,res)=>{
   res.send("<h1>Vietpro Academy</h1>");
});
*/

router.get("/users/:userId/products/:prdId", (req,res)=>{
    console.log(req.params);
    res.send("<h1>Vietpro Academy</h1>");
});

router.get("/home" , (req, res) => {
    res.send("<h1>Welcome to Vietpro Academy</h1>");
});

app.use("/static", express.static(__dirname+"/src/public"));

app.use(router);

app.listen(port=3000 , ()=>{
    console.log("Server running on port"+port);
});