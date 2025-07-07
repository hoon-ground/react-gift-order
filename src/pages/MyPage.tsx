import styled from '@emotion/styled'
import { useUser } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Wrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.spacing12} ${theme.spacing.spacing4}`};
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`

const Button = styled.button`
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  padding: ${({ theme }) => `${theme.spacing.spacing2} ${theme.spacing.spacing4}`};
  background-color: ${({ theme }) => theme.colors.gray.gray200};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  border: none;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  cursor: pointer;
`

const MyPage = () => {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  const { email } = user
  const username = email.split('@')[0]

  return (
    <Wrapper>
      <Title>마이 페이지</Title>
      <Text>{username}님 안녕하세요!</Text>
      <Text>이메일 주소는 {email}입니다.</Text>
      <Button
        onClick={() => {
          logout()
          navigate('/login')
        }}
      >
        로그아웃
      </Button>
    </Wrapper>
  )
}

export default MyPage