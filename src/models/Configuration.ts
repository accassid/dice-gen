export type ConfigurationSettings = {
  orbitSpeed: number
  showGrid: number
  isConfigurationDialogVisible: boolean
  projectName: string
}

export const DEFAULT_CONFIGURATION_SETTINGS = {
  orbitSpeed: 0.5,
  showGrid: 1,
  isConfigurationDialogVisible: false,
  projectName: 'My custom dice',
}
