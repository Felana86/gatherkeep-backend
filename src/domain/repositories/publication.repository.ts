import { PublicationEntity } from '../entities/publication.entity';

export interface PublicationRepository {
  findById(id: number): Promise<PublicationEntity | null>;
  findAll(): Promise<PublicationEntity[]>;
  create(publication: PublicationEntity): Promise<PublicationEntity>;
  update(id: number, publication: PublicationEntity): Promise<PublicationEntity>;
  delete(id: string): Promise<void>;
}