export interface IWorkspaceDeleteData {
  userId: string;
  workspaceId: string;
}

export interface IWorkspaceData {
  role: {
    created_at: string;
    description: string;
    id: string;
    name: string;
    policy: string;
    updated_at: string;
  };
  workspaceProject: {
    projects: Array<{
      created_at: string;
      description: string | null;
      id: string;
      name: string;
      ns_id: string;
      updated_at: string;
    }>;
    workspace: {
      created_at: string;
      description: string;
      id: string;
      name: string;
      updated_at: string;
    };
  };
}
