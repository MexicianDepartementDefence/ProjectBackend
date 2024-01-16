import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kategori } from './kategori.entity';
import { Like, Repository } from 'typeorm';
import BaseResponse from 'src/utils/Response/base.response';
import { REQUEST } from '@nestjs/core';
import { CreateKategoriDto, FindAllKategori } from './kategori.dto';
import { ResponseSuccess, ResponsePagination } from 'src/interface/respone';
@Injectable()
export class KategoriService extends BaseResponse{
    constructor(
        @InjectRepository(Kategori) private readonly kategoriRepository: Repository<Kategori>,
@Inject(REQUEST) private req:any

    ) {
        super()
    }

    async create (payload: CreateKategoriDto) : Promise<ResponseSuccess> {
        try {
            await this.kategoriRepository.save({
                ...payload,
                created_by: {id: this.req.user.id}
            });

            return this._success("Berhasil Menambahkan Kategori", payload)
        }
        catch {
            throw new HttpException("Ada Kesalahan", HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async getAllCategory (query: FindAllKategori) : Promise<ResponsePagination> {
        const {page, pageSize, limit, nama_kategori} = query;

        const filterQuery: any = {}
        if (nama_kategori) {
            filterQuery.nama_kategori = Like(`%${nama_kategori}%`);
        }

        const total = await this.kategoriRepository.count(
            {where: filterQuery}
        );

        const result = await this.kategoriRepository.find({
            where: filterQuery,
            relations: ["created_by", "updated_by"],
            select: {
                id: true,
                nama_kategori: true,
                created_by: {
                    id: true,
                    nama: true
                },
                updated_by: {
                    id: true,
                nama: true},
                

            },
            skip: limit,
            take: pageSize
        })

        return this._pagination("Sip", result, total, page,pageSize)
    }
}
