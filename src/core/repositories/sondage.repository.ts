import { SondageEntity } from '../domain/entities/sondage.entity';

export interface SondageRepository {
  findById(id: number): Promise<SondageEntity>;
  findAll(): Promise<SondageEntity[]>;
  create(sondage: SondageEntity): Promise<SondageEntity>;
  update(id: number, sondage: SondageEntity): Promise<SondageEntity>;
  delete(id: number): Promise<SondageEntity>;
}