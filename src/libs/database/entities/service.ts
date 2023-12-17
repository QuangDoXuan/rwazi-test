import { Entity, Column, OneToMany, Index } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import { ServiceToCategory } from "./service-to-category";
import { Favorite } from "./favorites";

@Entity({name: "services"})
export class Service extends AbstractEntity<Service> {
  @Index({ fulltext: true })
  @Column({ name: 'name', length: 255, nullable: false })
  name: string;

  @Column({ name: 'location', type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: string;

  @OneToMany(
    () => ServiceToCategory,
    sc => sc.service,
    { cascade: ['insert', 'update'] },
  )
  serviceToCategories: ServiceToCategory[];

  @OneToMany(
    () => Favorite,
    sc => sc.service,
    { cascade: ['insert', 'update'] },
  )
  favorites: Favorite[];
}
