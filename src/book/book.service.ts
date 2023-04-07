import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find()
        return books
    }
}
