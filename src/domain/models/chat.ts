export type ChatModel = {
  id: string
  name: string
  welcomeMessage: string
  date: Date
  accountId: string
  steps?: Step[]
}

export type StepType = 'text' | 'user' | 'custom' | 'options' | 'update'

export type Option = {
  value: number
  label: string
  trigger: string | number
}

export type Step= {
  type: StepType
  stepId: string | number
  message: string | Function
  trigger?: string | number | Function
  avatar?: string
  delay?: number
  end?: boolean
  placeholder?: string
  hideInput?: boolean
  inputAttributes?: object
  metadata?: object
  user?: boolean
  validator?: Function
  options?: Option[]
  replace?: boolean
  waitAction?: boolean
  asMessage?: boolean
  component?: string
  update?: string | number
}
