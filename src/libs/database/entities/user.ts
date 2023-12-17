import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import bcrypt from 'bcrypt';
import { Favorite } from "./favorites";

@Entity({name: "users"})
export class User extends AbstractEntity<User> {
  @Column({ name: 'email', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'full_name', length: 255, nullable: true })
  fullName: string;

  @OneToMany(
    () => Favorite,
    sc => sc.user,
    { cascade: ['insert', 'update'] },
  )
  favorites: Favorite[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
