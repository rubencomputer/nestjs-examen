import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizensModule } from './ciudadanos/citizen.module';

@Module({
  imports: [
    CitizensModule,
    MongooseModule.forRoot(
      'mongodb+srv://rubenostosg:p5n4zHiAfXoaIwBq@cluster0.myosr0q.mongodb.net/citizens?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
