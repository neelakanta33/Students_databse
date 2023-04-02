const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// !middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const url = "mongodb://localhost:27017/StudentDetails";

mongoose.connect(url).then(() => {
    console.log("connected to data base");
});

const schema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    branch: {
        type: String,
    },
    address: {
        type: String,
    },
    age: {
        type: Number,
    },
    phoneNumber: {
        type: String,
    },
    course: {
        type: String,
    }
});

const details = new mongoose.model("details", schema);

//!post method to post data to the database

app.post("/posts", async(req, res) => {
    const data = await details.findOne({ name: req.body.name });
    if (data) {
        res.send({ message: "data already exists" });
        return;
    }

    let post = new details({
        id: req.body.id,
        name: req.body.name,
        branch: req.body.branch,
        address: req.body.address,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        course: req.body.course
    });
    try {
        await post.save();
        res.send({ message: "Post added SuccessFully" });
    } catch (err) {
        res.send({ message: "Failed to add post" });
    }
});

//!get method used to get all the data from data base
app.get("/posts", async(req, res) => {
    try {
        const posts = await details.find();
        res.send(posts);
    } catch (err) {
        console.log(err);
    }
});

//!delete method used to delete the data
app.delete("/posts/:id", async(req, res) => {
    try {
        const data = await details.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

//!update method used to update the data
app.put("/posts/:id", async(req, res) => {
    const { id } = req.params;
    await details.findOneAndUpdate({ id: id }, {
        $set: {
            name: req.body.name,
            branch: req.body.branch,
            address: req.body.address,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            course: req.body.course
        },
    });
    res.send({ message: "Data updated successfully" });
});

// !server listening
app.listen(4001, () => {
    console.log("listing");
});