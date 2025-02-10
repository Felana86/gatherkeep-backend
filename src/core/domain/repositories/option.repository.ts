import { OptionEntity } from '../domain/entities/option.entity';

export interface OptionRepository {
  findById(id: number): Promise<OptionEntity | null>;
  findByName(optionName: string): Promise<OptionEntity | null>;
  create(option: OptionEntity): Promise<OptionEntity>;
  update(id: number, option: OptionEntity): Promise<OptionEntity>;
  delete(id: number): Promise<void>;
}