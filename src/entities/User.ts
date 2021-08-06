import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Pokemon from "./Pokemon";
import userPokemons from "./UserPokemons";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => userPokemons, (userPokemons) => userPokemons.user)
  pokemonsUser: userPokemons[];
}
