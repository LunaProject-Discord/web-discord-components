import { Role } from './role';

export type UserTag = { type: 'system' } | { type: 'application', verified?: boolean } | { type: 'webhook' };

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    tag?: UserTag;
    role?: string | Role;
}
