import { parseISO, format } from 'date-fns'

const dateFormat = 'LLLL d, yyyy'

type DateProps = {
  dateString: string
}

const Date = ({ dateString }: DateProps) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}

export { Date }
