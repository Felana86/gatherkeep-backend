import { AdhesionEntity } from '../entities/adhesion.entity';

export interface AdhesionRepository {
  findById(id: number): Promise<AdhesionEntity | null>;
  findAll(): Promise<AdhesionEntity[]>;
  findByUserAndAssociation(userId: number, associationId: number): Promise<AdhesionEntity | null>;
  create(adhesion: AdhesionEntity): Promise<AdhesionEntity>;
  update(id: number, adhesion: AdhesionEntity): Promise<AdhesionEntity>;
  delete(id: number): Promise<void>;
}