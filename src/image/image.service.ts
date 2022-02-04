import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  @InjectRepository(Image)
  private readonly imageRepository: Repository<Image>;

  async create(images: Array<Image>) {
    return await this.imageRepository.save(images);
  }

  async remove(criteria: number | Array<number>): Promise<boolean> {
    const result = await this.imageRepository.delete(criteria);

    return !!result.affected;
  }
}
