import { ResetKataSandi } from "src/utils/dto/main.dto";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { ResetPassword } from "./reste_password.entity";

@Entity()
export class User extends BaseEntity {
@PrimaryGeneratedColumn()
id : number;

@Column({nullable: true})
avatar : string

@Column({nullable: false})
nama : string

@Column({unique : true, nullable: false})
email : string

@Column({nullable : false})
password : string;

@Column({nullable: true})
refresh_token : string;

@Column({nullable : true})
role : string;

@OneToMany(() => ResetPassword, (reset) => reset.user)
reset_password: ResetPassword

@Column({type : "datetime", default: () => "CURRENT_TIMESTAMP"})
created_at : Date;



@Column({type: "datetime", default : () => "CURRENT_TIMESTAMP"})
updated_at : Date;

}

