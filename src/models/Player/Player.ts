import { Table, Column, Model, DataType, Unique, AllowNull, PrimaryKey, IsUUID, IsEmail, Default } from "sequelize-typescript";

@Table({paranoid:true, timestamps:true})
export default class Player extends Model{
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @Column(DataType.UUID)
    public id!: string;

    @AllowNull(false)
    @Column
    public nickname!: string;

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    public email!: string;

    @AllowNull(false)
    @Column
    public passwordHash!: string;
}

