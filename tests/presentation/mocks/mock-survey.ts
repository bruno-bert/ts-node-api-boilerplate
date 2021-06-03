import { AddSurvey, LoadSurveys, CheckSurveyById } from '@/domain/usecases'
import { mockSurveyModels } from '@/tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<void> {
    this.params = params
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  accountId: string
  result = mockSurveyModels()

  async load (accountId: string): Promise<LoadSurveys.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
