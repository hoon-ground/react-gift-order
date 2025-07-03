const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PW_LEN = 8

export const emailValidator = (value: string): string => {
  if (!value.trim()) return 'ID를 입력해주세요.'
  if (!EMAIL_REGEX.test(value)) return 'ID는 이메일 형식으로 입력해주세요.'
  return ''
}

export const passwordValidator = (value: string): string => {
  if (!value.trim()) return 'PW를 입력해주세요.'
  if (value.length < PW_LEN) return 'PW는 최소 8글자 이상이어야 합니다.'
  return ''
}