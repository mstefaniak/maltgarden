interface AlertProps {
  preview: boolean,
}

const Alert = ({ preview }: AlertProps) => {
  if (!preview) {
    return null;
  }

  return (
    <div>
      This is page is a preview.{' '}
      <a
        href="/api/exit-preview"
      >
        Click here
      </a>{' '}
      to exit preview mode.
    </div>
  )
}

export { Alert }
