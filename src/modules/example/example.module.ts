import { Module } from '@nestjs/common'
import { ExampleService } from './example.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExampleEntity } from './entities/example.entity'
import { ExampleController } from './example.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
