const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const FoodModel = require("./models/Food");




app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://admin:tahmina12@cluster0.arwd4.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({ foodName: "foodName", daySinceIAte: days});

    try {
     await food.save();
     res.send("insert data");
    }catch (err) {
        console.log(err);
    }
});

app.get("/read", async(req, res)=> {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result);

    })

});

app.put('/update', async (req, res) => {

    const NewFoodName = req.body.NewFoodName
    const id = req.body.id

    try {
     await FoodModel.findById(id,(err, updatedFood) => {
         updatedFood.foodName = NewFoodName
         updatedFood.save();
         res.send("update");
     })
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res)=> {

    const id = req.params.id;
     await FoodModel.findByIdAndRemove(id).exec();
     res.send("deleted");

})


app.listen(3002, () => {
    console.log("Server running on port 3002...");
});