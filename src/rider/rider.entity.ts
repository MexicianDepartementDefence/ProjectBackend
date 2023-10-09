import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rider extends BaseEntity {
    @PrimaryGeneratedColumn()

    id : number;
    @Column()
    nama_pembalap : string;

    @Column()
    tim : string;

    @Column()
    tahun_masuk : number;

    @Column()
    tahun_keluar : number;

    @Column()
    menang : number;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    dibuat_pada : Date;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    diupdate_pada : Date;
}