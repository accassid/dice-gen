export type ProjectSettings = {
  currentProjectFilename: string | null
  autosaveProject: number | null
  isProjectSettingsDoingSomething: number | null
}

export const DEFAULT_PROJECT_SETTINGS = {
  currentProjectFilename: null,
  autosaveProject: 1,
  isProjectSettingsDoingSomething: 0,
}
