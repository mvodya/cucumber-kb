import { Exclude } from 'class-transformer';
import { Bucket } from 'src/bucket/bucket.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ObjectReq {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Exclude()
  @ManyToOne(() => Bucket, (bucket) => bucket.objectreqs)
  bucket: Bucket

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('json', {nullable: true})
  data: object;

  @Column('json', {nullable: true})
  responce: object;

  @Column({default: true})
  is_planned: boolean;

  @Column({default: false})
  is_done: boolean;
}