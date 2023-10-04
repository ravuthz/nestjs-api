import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Demo {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn({ default: 0 })
  version: number;

  @Column({ type: 'varchar', nullable: false, default: null, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  note: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt!: Date;

  @Column({ type: 'integer', nullable: true, default: null })
  createdBy: number;

  @Column({ type: 'integer', nullable: true, default: null })
  updatedBy: number;

  @Column({ type: 'integer', nullable: true, default: null })
  deletedBy: number;
}
