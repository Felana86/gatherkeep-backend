import { AdhesionEntity } from '../domain/entities/adhesion.entity';

export interface AdhesionRepository {
  findById(id: number): Promise<AdhesionEntity | null>;
  findAll(): Promise<AdhesionEntity[]>;
  create(adhesion: AdhesionEntity): Promise<AdhesionEntity>;
  update(id: number, adhesion: AdhesionEntity): Promise<AdhesionEntity>;
  delete(id: number): Promise<void>;
}