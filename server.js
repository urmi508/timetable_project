const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 MongoDB Atlas connect
mongoose.connect(
  "mongodb+srv://urmiipatel272008_db_user:jPqH50Hi87UYnJnJ@cluster0.dutmpgo.mongodb.net/timetableDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));


// 🔹 Student Schema
const studentSchema = new mongoose.Schema({
  email: {type:String,required:true},
  course: String,
});

const Student = mongoose.model("Student", studentSchema);


// 🔹 Timetable Schema
const timetableSchema = new mongoose.Schema({
  course: {type:String,required:true},
  day: {type:String,required:true},
  subject1: String,
  subject2: String,
  subject3: String,
  subject4: String
});

const Timetable = mongoose.model("Timetable", timetableSchema);

//API Routes
// 🔹 Save Student Data
app.post("/student", async (req, res) => {
try{
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json({message:"Student saved successfullyyy!!!"});
}
  catch(err){
    res.status(500).json({error:"Error saving student:"+err.message});
  }
    
  });

// 🔹 Save timetable
app.post("/timetable", async (req, res) => {
try{
  const newEntry = new Timetable(req.body);
  await newEntry.save();
  res.status(201).json({message:"Timetable add successfullyyy!!!"});
}
  catch (err){
    res.status(400).json({error:"Error adding timetable:"+err.message});
  }
});

//Fetch the Frontend
app.get("/timetable",async(req,res)=>{
  try{
    const{course,day}=req.query;
    const timetable = await
    Timetable.findOne({course:course,day});

    if(timetable){
      res.json(timetable);
    }else{
      res.status(404).json({message:`No timetable found for this ${course} on ${day}.`});
    }
  }
  catch (err){
    res.status(500).json({error:"Server Error:"+err.message});
  }
});
// 🔹 Server start
const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});
