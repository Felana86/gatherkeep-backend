import { AssociationEntity } from '../entities/association.entity';

export interface AssociationRepository {
  findById(id: number): Promise<AssociationEntity>;
  findAll(): Promise<AssociationEntity[]>;
  findByCity(city: string): Promise<AssociationEntity[]>;
  create(association: AssociationEntity): Promise<AssociationEntity>;
  update(id: number, association: AssociationEntity): Promise<AssociationEntity>;
  delete(id: number): Promise<void>;
}