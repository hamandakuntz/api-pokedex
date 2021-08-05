import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("pokemon")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: string;

  @Column()
  height: string;

  @Column()
  baseExp: string;

  @Column()
  description: string;

  @Column()
  inMyPokemons: boolean;

  @ManyToOne(() => User, (user) => user.pokemon)
  user: User;
}
