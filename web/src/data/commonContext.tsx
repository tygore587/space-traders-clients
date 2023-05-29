import { Agent } from '@/models/Agent';
import { ShipModel } from '@/models/Ship';
import { createContext } from 'react';

interface IContext {
    agent?: Agent
    shiplist?: ShipModel[]
}

//export let AgentContext = createContext<Agent>(undef);