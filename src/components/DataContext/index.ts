import { createContext } from 'react';
import { Channel, Role, User } from '../../interfaces';

export const ChannelsDataContext = createContext<Record<string, Channel>>({});

export const RolesDataContext = createContext<Record<string, Role>>({});

export const UsersDataContext = createContext<Record<string, User>>({});
