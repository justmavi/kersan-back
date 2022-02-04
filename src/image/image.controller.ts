import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { Image } from 'src/image/entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './image.service';
import { DeleteImagesFilters } from './types/delete-images-filters.type';

@Controller('image')
@Authorize()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 8))
  async create(
    @Body() { productId }: CreateImageDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const photos = images?.map((item) => new Image({ productId, ...item }));

    return await this.imageService.create(photos);
  }

  @Delete(':id')
  async removeOne(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.imageService.remove(id);

    if (!result) {
      throw new NotFoundException('Image not found');
    }

    return { ok: result };
  }

  @Delete()
  async removeMany(@Body() { images }: DeleteImagesFilters): Promise<IOk> {
    const result = await this.imageService.remove(images);

    if (!result) {
      throw new NotFoundException('Image not found');
    }

    return { ok: result };
  }
}
