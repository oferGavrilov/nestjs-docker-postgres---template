import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student/schemas/student.schema'
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, { dbName: 'nestdb' }),
    MongooseModule.forFeature([{name:'Student' , schema:StudentSchema}])
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule { }
