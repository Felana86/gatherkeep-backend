import { EventEntity } from '../entities/event.entity';

export interface EventRepository {
  findById(id: number): Promise<EventEntity | null>;
  findAll(): Promise<EventEntity[]>;
  create(eventEntity: EventEntity): Promise<EventEntity>;
  update(id: number, eventEntity: EventEntity): Promise<EventEntity>;
  delete(id: number): Promise<void>;
}