import { VoteEntity } from '../domain/entities/vote.entity';

export interface VoteRepository {
  findById(id: number): Promise<VoteEntity | null>;
  create(vote: VoteEntity): Promise<VoteEntity>;
  update(id: number, vote: VoteEntity): Promise<VoteEntity>;
  delete(id: number): Promise<void>;
}