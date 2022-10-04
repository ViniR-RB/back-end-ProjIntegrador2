import {
    BaseEntity, Entity, Column,
    PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn, ManyToOne, JoinColumn
} from "typeorm"
import User from './User'



@Entity('appointments')
class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string
    @ManyToOne(() => User) // Muitos Agendamentos para um usuario --- Cardinalidade
    @JoinColumn({ name : 'provider_id'})
    provider: User;

    @Column('timestamp')
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}
export default Appointment
