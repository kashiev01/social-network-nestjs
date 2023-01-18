import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from 'src/posts/entities/posts.entity';

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

  @OneToMany(() => PostEntity, (post) => post.user, {
    nullable: true,
  })
  @JoinColumn()
  posts: PostEntity[];

  // @ManyToMany(() => SubscriptionEntity, { cascade: true, onDelete: 'CASCADE' })
  // @JoinTable({ name: 'sub_auto' })
  // subscriptions: SubscriptionEntity[];
}
