import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { IOk } from 'src/common/types/ok.type';
import { Image } from 'src/image/entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { ImageService } from './image.service';

@Controller(Image.name)
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

  @Delete()
  async remove(@Body() { images }: DeleteImagesDto): Promise<IOk> {
    const result = await this.imageService.remove(images);

    if (!result) {
      throw new NotFoundException('Image(s) not found');
    }

    return { ok: result };
  }
}
