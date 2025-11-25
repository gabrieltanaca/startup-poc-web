export const formatDateISO = (
  isoString: string | null | undefined,
  locale: 'pt' | 'en' = 'pt',
): string => {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);

  let localeString: string;
  let separator: string;

  if (locale === 'en') {
    localeString = 'en-GB';
    separator = ' ';
  } else {
    localeString = 'pt-BR';
    separator = ' às ';
    date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  };

  const datePart = date.toLocaleDateString(localeString, dateOptions);

  const timePart = date.toLocaleTimeString(localeString, timeOptions);

  return `${datePart}${separator}${timePart}`;
};
