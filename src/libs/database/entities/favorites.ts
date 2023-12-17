
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import { Service } from "./service";
import { User } from "./user";

@Entity({name: "favorites"})
export class Favorite extends AbstractEntity<Favorite> {
  @Column({ name: 'user_id', type: 'integer', nullable: true })
  userId: number;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'service_id', type: 'integer', nullable: true })
  serviceId: number;

  @ManyToOne(() => Service, service => service.id, { nullable: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
