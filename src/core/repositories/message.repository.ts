import { MessageEntity } from '../domain/entities/message.entity';

export interface MessageRepository {
  findById(id: number): Promise<MessageEntity | null>;
  findAll(): Promise<MessageEntity[]>;
  create(message: MessageEntity): Promise<MessageEntity>;
  update(id: number, message: MessageEntity): Promise<MessageEntity>;
  delete(id: number): Promise<MessageEntity>;
}