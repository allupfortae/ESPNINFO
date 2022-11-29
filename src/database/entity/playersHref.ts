import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PLAYERS {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", default: null })
  href: string;
}
