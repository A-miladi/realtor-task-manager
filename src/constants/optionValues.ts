export type Options = 'yes' | 'no'

export const OPTION_VALUES: Record<Options, Options> = {
  yes: 'yes',
  no: 'no',
}

export const OPTION_FARSI_VALUES = [
  {
    optionId: '1',
    label: 'دارد',
  },
  {
    optionId: '0',
    label: 'ندارد',
  },
]

export const REQUIRE_OPTION_FARSI_VALUES = [
  {
    optionId: '1',
    label: 'دارد',
  },
  {
    optionId: '0',
    label: 'ندارد',
  },
]
export const TASK_STATUS = [
  {
    optionId: 'TODO',
    label: 'انجام نشده',
  },
  {
    optionId: 'IN_PROGRESS',
    label: 'درحال انجام',
  },

  {
    optionId: 'COMPLETED',
    label: 'انجام شده',
  },
]
