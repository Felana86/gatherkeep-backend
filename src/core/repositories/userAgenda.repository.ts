import { UserAgendaEntity } from '../domain/entities/userAgenda.entity';

export interface UserAgendaRepository {
  findById(id: number): Promise<UserAgendaEntity | null>;
  create(userAgenda: UserAgendaEntity): Promise<UserAgendaEntity>;
  update(id: number, userAgenda: UserAgendaEntity): Promise<UserAgendaEntity>;
  delete(id: number): Promise<UserAgendaEntity>;
}