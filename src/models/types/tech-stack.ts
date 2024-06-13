export enum TechStackItemType {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  DATABASE = "DATABASE",
  DEVOPS = "DEVOPS",
  OTHER = "OTHER", // todo add more types
}

export type TechStackItemPayload = {
  name: string;
  description: string;
  type: TechStackItemType;
};

export type TechStackItem = TechStackItemPayload & {
  id: string;
};
