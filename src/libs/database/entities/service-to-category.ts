
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import { Service } from "./service";
import { Category } from "./category";

@Entity({name: "services_to_categories"})
export class ServiceToCategory extends AbstractEntity<ServiceToCategory> {
  @Column({ name: 'service_id', type: 'integer', nullable: true })
  serviceId: number;

  @ManyToOne(() => Service, service => service.id, { nullable: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'category_id', type: 'integer', nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, cat => cat.id, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
