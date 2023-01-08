/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CalendarPickerView,
  LocalizationProvider as MuiLocalizationProvider,
  PickersLocaleText,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { ReactElement, ReactNode } from 'react';

const localeText: PickersLocaleText<unknown> = {
  // Calendar navigation
  previousMonth: 'Mês anterior',
  nextMonth: 'Próximo mês',

  // View navigation
  openPreviousView: 'abrir visualização anterior',
  openNextView: 'abrir visualização seguinte',
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) =>
    view === 'year'
      ? 'Visualização de ano está aberta, troque para visualização do calendário'
      : 'Visualização do calendário está aberta, troque para visualização de ano',
  inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
    isKeyboardInputOpen
      ? `text input view is open, go to ${viewType} view`
      : `${viewType} view is open, go to text input view`,

  // DateRange placeholders
  start: 'Início',
  end: 'Fim',

  // Action bar
  cancelButtonLabel: 'Cancelar',
  clearButtonLabel: 'Limpar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hoje',

  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Selecionar data',
  dateTimePickerDefaultToolbarTitle: 'Selecionar data e hora',
  timePickerDefaultToolbarTitle: 'Selecionar hora',
  dateRangePickerDefaultToolbarTitle: 'Selecionar período de data',

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Select ${view}. ${
      time === null
        ? 'Sem hora selecionada'
        : `Hora selecionada é ${adapter.format(time, 'fullTime')}`
    }`,
  hoursClockNumberText: (hours) => `${hours} horas`,
  minutesClockNumberText: (minutes) => `${minutes} minutos`,
  secondsClockNumberText: (seconds) => `${seconds} segundos`,

  // Open picker labels
  openDatePickerDialogue: (rawValue, utils) =>
    rawValue && utils.isValid(utils.date(rawValue))
      ? `Selecione uma data, a data selecionada é ${utils.format(
          utils.date(rawValue)!,
          'fullDate',
        )}`
      : 'Selecione uma data',
  openTimePickerDialogue: (rawValue, utils) =>
    rawValue && utils.isValid(utils.date(rawValue))
      ? `Selecione uma hora, hora selecionada é ${utils.format(utils.date(rawValue)!, 'fullTime')}`
      : 'Selecione uma hora',

  // Table labels
  timeTableLabel: 'Selecione uma hora',
  dateTableLabel: 'Selecione uma data',
};

export const LocalizationProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBrLocale}
      localeText={localeText}
    >
      {children}
    </MuiLocalizationProvider>
  );
};
