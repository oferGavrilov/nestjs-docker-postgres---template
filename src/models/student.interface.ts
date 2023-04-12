import { Document } from "mongoose";

export interface Student extends Document {
    readonly name:string
    readonly rollNumber:number
    readonly class:number
    readonly gender:string
    readonly marks:number
}