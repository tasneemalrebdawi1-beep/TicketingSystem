// منعرف كل التوابع يلي بتلزمنا لعمليات الاضافة والحذف وكلشي 

import Student from "../models/student.js";

// post : 
export const CreateStudent = async (req,res) => {
    try{
        const {name , age , phone , subjects} = req.body;
        const student = await Student.create({
            name , age , phone , subjects
        });
        res.status(201).json({
            success : true,
            data : student,
        });
    }
    catch(error) {
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}


// Get : All Students
export const getAllStudents = async(req, res) => {
    try {
        const student = await Student.find().toSorted({createdAt : -1}); //createdAt : تعرض الطلاب بالترتيب
        res.status(200).json({
            success : true,
            data : student,
            count : student.length
        }); 
    }
    catch(error) {
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}



// Update : Put : 
export const UpdateStudent = async (req,res) => {
    try {
        const {name , age , phone , subjects} = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id ,
            { name , age , phone , subjects },
            { new : true , runValidators : true } // يعني القيمة الجديدة بعد التعديل تنحط مكان القديم وتروح البيانات السابقة نهائيا
        );
        // اذا اسم الطالب المراد تعديله مش موجود
        if (!student) {
            return res.status(404).json ({
                success : false,
                message : "Student not found",
            }); }
            // اذا موجود 
            return res.status(200).json({
                success : true,
                data : student,
            });
        
    } catch(error) {
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}

// Delete :
export const deleteStudent = async(req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json ({
                success : false,
                message : "Student not found",
            }); }
            // اذا موجود 
            res.status(200).json({
                success : true,
                message : "Student Deleted Successfully",
                data : student,
            }); }
    catch (error) {
        res.status(400).json({
            success : false,
            message : "Fail To Delete Student",
            message : error.message,
        });
    }
}

