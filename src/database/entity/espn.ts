import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ESPN {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", default: null })
  team: string[];

  @Column({ type: "varchar", default: null })
  title: string[];

  @Column({ type: "int", default: null })
  stats: number;

  @Column({ type: "int", default: null })
  total: number;

  @Column({ type: "varchar", default: null })
  name: string[];

  @Column({ type: "varchar", default: null })
  href: string[];

  @Column({ type: "varchar", default: null })
  positions: string[];
}
