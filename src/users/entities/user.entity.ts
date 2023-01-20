import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from 'src/posts/entities/posts.entity';
import { SubscriptionEntity } from '../../subscriptions/entities/subscription.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, default: 'John' })
  firstName: string;

  @Column({ type: 'varchar', length: 300, default: 'Doe' })
  lastName: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @OneToMany(() => PostEntity, ({ user }: PostEntity) => user, {
    cascade: true,
  })
  posts: PostEntity[];

  @OneToMany(() => SubscriptionEntity, ({ user }: SubscriptionEntity) => user, {
    cascade: true,
  })
  subscriptions: SubscriptionEntity[];
}
