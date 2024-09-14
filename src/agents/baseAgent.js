/**
 * Base Agent Definition.
 *
 * This file defines the BaseAgent class, which serves as the foundational component for all agents within the library. 
 * It includes fundamental methods for setting environment variables, managing agent status, and abstract methods 
 * for task execution which must be implemented by subclasses to handle specific tasks.
 *
 * Usage:
 * Extend this class to create specialized agents with specific behaviors suited to different types of tasks and workflows.
 */

import { v4 as uuidv4 } from 'uuid';
import { AGENT_STATUS_enum } from '../utils/enums';
import { REACT_CHAMPION_AGENT_DEFAULT_PROMPTS } from '../utils/prompts';

class BaseAgent {
    constructor({ name, role, goal, background, tools, llmConfig = {}, maxIterations = 10, forceFinalAnswer = true, promptTemplates = {} }) {
        this.id = uuidv4();
        this.name = name;
        this.role = role;
        this.goal = goal;
        this.background = background;
        this.tools = tools;
        this.maxIterations = maxIterations;
        this.store = null;
        this.status = AGENT_STATUS_enum.INITIAL;
        this.env = null;
        this.llmConfig = { 
            provider: "openai", 
            model: "gpt-4o-mini",
            maxRetries: 1,
            ...llmConfig 
        };
        this.llmSystemMessage = null;
        this.forceFinalAnswer = forceFinalAnswer;
        
        // Initialize promptTemplates
        this.promptTemplates = { ...REACT_CHAMPION_AGENT_DEFAULT_PROMPTS };
        // Allow custom prompts to override defaults
        Object.assign(this.promptTemplates, promptTemplates);
    }

    setStore(store) {
        this.store = store;
    }

    setStatus(status) {
        this.status = status;
    }

    setEnv(env) {
        this.env = env;
    }

    workOnTask(task) {
        throw new Error("workOnTask must be implemented by subclasses.");
    }
}

export { BaseAgent };