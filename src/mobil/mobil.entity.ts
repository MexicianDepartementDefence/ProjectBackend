import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Mobil extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nama : string;

    @Column()
    merek_mobil : string;

    @Column()
    tipe_mobil : string;

    @Column()
    tahun : number;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updated_at : Date;
    
}