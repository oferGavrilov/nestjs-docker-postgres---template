import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/models/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel: Model<Student>) {

    }

    // Create student in mongoDB
    async createStudent(CreateStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = await new this.studentModel(CreateStudentDto)
        return newStudent.save() // Save a new student
    }

    // Get all students from mongoDB
    async getAllStudents(): Promise<Student[]> {
        const studentData = await this.studentModel.find()
        if (!studentData || !studentData.length) {
            throw new NotFoundException('Student data not found')
        }
        return studentData
    }

    // Get student by ID from mongoDB
    async getStudentById(studentId: string): Promise<Student> {
        const existingStudent = await this.studentModel.findById(studentId)
        if (!existingStudent) {
            throw new NotFoundException(`Student ${studentId} not found`)
        }
        return existingStudent
    }

    // Remove student from mongoDB
    async removeStudent(studentId: string): Promise<Student> {
        const removedStudent = await this.studentModel.findByIdAndDelete(studentId)
        if (!removedStudent) {
            throw new NotFoundException(`Student ${studentId} not found`)
        }
        return removedStudent
    }

    //Update student from mongoDB 
    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId , updateStudentDto ,{new:true})
        if(!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`)
        }
        return existingStudent
    }
}
