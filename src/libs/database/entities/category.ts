
import { Entity, Column, OneToMany } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import { ServiceToCategory } from "./service-to-category";

@Entity({name: "categories"})
export class Category extends AbstractEntity<Category> {
  @Column({ name: 'name', length: 255, nullable: false })
  name: string;

  @OneToMany(
    () => ServiceToCategory,
    sc => sc.category,
    { cascade: ['insert', 'update'] },
  )
  serviceToCategories: ServiceToCategory[];
}
