import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("pokemon")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  @Column('boolean', {default: false})
  inMyPokemons: boolean;

  @ManyToOne(() => User, (user) => user.pokemon, {
    cascade: true
  })
  user: User;
}
