import { CommentEntity } from '../domain/entities/comment.entity';

export interface CommentRepository {
  findById(id: number): Promise<CommentEntity | null>;
  create(comment: CommentEntity): Promise<CommentEntity>;
  update(id: number, comment: CommentEntity): Promise<CommentEntity>;
  delete(id: number): Promise<CommentEntity>;
}