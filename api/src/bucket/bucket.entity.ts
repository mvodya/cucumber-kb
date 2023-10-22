import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Bucket {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({default: ""})
  description: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('json', {nullable: true})
  model: object;

  @Column('json', {nullable: true})
  data: object;
}