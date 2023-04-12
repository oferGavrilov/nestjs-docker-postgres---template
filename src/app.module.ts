import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student/schemas/student.schema'
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, { dbName: 'nestdb' }),
    MongooseModule.forFeature([{name:'Student' , schema:StudentSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
