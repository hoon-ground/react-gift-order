import styled from '@emotion/styled'
import ErrorMessage from './ErrorMessage'

const ReceiverTab = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`

const FieldLabel = styled.label`
  width: ${({ theme }) => theme.spacing.spacing16};
  margin-top: ${({ theme }) => theme.spacing.spacing1};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`

const FieldInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  resize: vertical;
  min-height: 100px;
`

interface OrderFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: () => void
  placeholder?: string
  error?: string
  as?: 'input' | 'textarea'
  type?: string
  min?: number
}

const OrderField = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  as = 'input',
  type = 'text',
  min
}: OrderFieldProps) => {
  return (
    <ReceiverTab>
      <FieldLabel>{label}</FieldLabel>
      <FieldInputWrapper>
        {as === 'textarea' ? (
          <Textarea
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
          />
        ) : (
          <Input
            type={type}
            min={min}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
          />
        )}
        <ErrorMessage message={error} />
      </FieldInputWrapper>
    </ReceiverTab>
  )
}

export default OrderField
