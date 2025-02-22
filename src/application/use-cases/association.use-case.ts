import { AssociationRepository } from '../../domain/repositoriesDomain/association.repository';
import { AdhesionRepository } from '../../domain/repositoriesDomain/adhesion.repsitory';
import { UserRepository } from '../../domain/repositoriesDomain/user.repository';
import { AssociationEntity } from '../../domain/entities/association.entity';
import { AdhesionEntity } from '../../domain/entities/adhesion.entity';
import { BadRequestException, ConflictException, HttpStatus } from '@nestjs/common';

export class AssociationUseCase {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly adhesionRepository: AdhesionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // Créer une association
  async createAssociation(name: string, city: string, description: string, category: string, latitude?: number, longitude?: number): Promise<AssociationEntity> {
    if (!name || !city || !description || !category) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST);
    }
    const association = new AssociationEntity(0, name, city, description, category, latitude, longitude, new Date(), new Date());
      return  this.associationRepository.create(association);
  }

  // Obtenir une association par l'id
  async getAssociationById(id: number): Promise<AssociationEntity | null> {
    return this.associationRepository.findById(id);
  }

  // Lister toutes les associations
  async getAllAssociations(): Promise<AssociationEntity[]> {
    return this.associationRepository.findAll()
  }

  // Mettre à jour une association
  async updateAssociation(id: number, name?: string, description?: string, city?: string, category?: string, latitude?: number, longitude?: number): Promise<AssociationEntity | null> {
    const association = await this.associationRepository.findById(id);
    if (!id) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST);
    }
    if (name) association.name = name;
    if (description) association.description = description;
    if (city) association.city = city;
    if (category) association.category = category;
    if (latitude) association.latitude = latitude;
    if (longitude) association.longitude = longitude;

    association.updatedAt = new Date();
    return this.associationRepository.update(id, association);
  }

  // Supprimer une association
  async deleteAssociation(id: number): Promise<void> {
    const association = await this.associationRepository.findById(id);
    if (!association) {
      throw new Error('Association non trouvée')
    }
    await this.associationRepository.delete(id);
  }

  // Ajouter un membre à une association
  async addMemberToAssociation(userId: number, associationId: number, status: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestException('Utilisateur non trouvé');

    const association = await this.associationRepository.findById(associationId);
    if (!association) throw new Error('Association non trouvée');

    const existingAdhesion = await this.adhesionRepository.findByUserAndAssociation(userId, associationId);
    if (existingAdhesion) {
      throw new ConflictException('Utilisateur déjà membre de cette association');
    }

    const adhesion = new AdhesionEntity(0, userId, associationId, status, new Date(), new Date());
    await this.adhesionRepository.create(adhesion);
  }

  // Supprimer un membre d'une association
  async removeMemberFromAssociation(userId: number, associationId: number): Promise<void> {
    const adhesion = await this.adhesionRepository.findByUserAndAssociation(userId, associationId);
    if (!adhesion) throw new BadRequestException("Cet utilisateur n'est pas membre de cette association")

    await this.adhesionRepository.delete(adhesion.id)
  }
}