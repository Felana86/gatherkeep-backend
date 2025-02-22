import { AssociationAgendaEntity } from '../entities/associationAgenda.entity';

export interface AssociationAgendaRepository {
  findById(id: number): Promise<AssociationAgendaEntity | null>;
  create(associationAgenda: AssociationAgendaEntity): Promise<AssociationAgendaEntity>;
  update(id: number, associationAgenda: AssociationAgendaEntity): Promise<AssociationAgendaEntity>;
  delete(id: number): Promise<void>;
}