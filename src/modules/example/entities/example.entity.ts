import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;
}
