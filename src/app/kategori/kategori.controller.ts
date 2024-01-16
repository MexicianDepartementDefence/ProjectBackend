import { Controller } from '@nestjs/common';
import { KategoriService } from './kategori.service';

@Controller('kategori')
export class KategoriController {
    constructor(private KategoriService: KategoriService) {}
}
