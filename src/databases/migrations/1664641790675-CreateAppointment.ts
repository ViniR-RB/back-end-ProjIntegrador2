import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAppointment1664641790675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,

                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        isNullable: false,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('appointments');
    }


}
