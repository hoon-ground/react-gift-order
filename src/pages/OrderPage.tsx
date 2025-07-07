import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { productMockData } from '@/mocks/products'
import { messageCardMockData } from '@/mocks/messageCards'
import { useInput } from '@/hooks/useInput'
import { messageRequiredValidator, nameRequiredValidator, phoneValidator, quantityValidator } from '@/utils/validator'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import ErrorMessage from '@/components/ErrorMessage'
import OrderField from '@/components/OrderField'

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
`

const CardSelector = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`

const Thumb = styled.img<{ isSelected: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 2px solid ${({ isSelected, theme }) =>
    isSelected ? theme.colors.semantic.kakaoYellow : 'transparent'};
  cursor: pointer;
`

const MainImage = styled.img`
  width: 100%;
  max-width: 300px;
  display: block;
  margin: 0 auto ${({ theme }) => theme.spacing.spacing4};
`

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`

const Note = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textSub};
`

const ProductInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundFill};

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.spacing.spacing1};
  }

  div {
    flex: 1;
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }
`

const OrderButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray1000};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  position: sticky;
  bottom: 0;
  text-align: center;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`

const OrderPage = () => {
  const { productId } = useParams()
  const product = productMockData.find((p) => p.id === Number(productId))
  const [selectedCardId, setSelectedCardId] = useState(messageCardMockData[0].id)
  const selectedCard = messageCardMockData.find((c) => c.id === selectedCardId)

  const messageInput = useInput(selectedCard?.defaultTextMessage || '', messageRequiredValidator)
  const senderInput = useInput('', nameRequiredValidator)
  const receiverNameInput = useInput('', nameRequiredValidator)
  const receiverPhoneInput = useInput('', phoneValidator)
  const quantityInput = useInput('1', quantityValidator)

  const navigate = useNavigate()
  const { user } = useUser()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [user])

  if (!product) return <div>상품을 찾을 수 없습니다.</div>

  const handleSubmit = () => {
    messageInput.onBlur()
    senderInput.onBlur()
    receiverNameInput.onBlur()
    receiverPhoneInput.onBlur()
    quantityInput.onBlur()

    if (
      messageInput.isValid &&
      senderInput.isValid &&
      receiverNameInput.isValid &&
      receiverPhoneInput.isValid &&
      quantityInput.isValid &&
      product
    ) {
      alert(
        `주문이 완료되었습니다.\n` +
        `상품명: ${product.name}\n` +
        `구매 수량: ${quantityInput.value}\n` +
        `발신자 이름: ${senderInput.value}\n` +
        `메시지: ${messageInput.value}`
      )

      navigate('/')
    }
  }

  return (
    <Wrapper>
      <CardSelector>
        {messageCardMockData.map((card) => (
          <Thumb
            key={card.id}
            src={card.thumbUrl}
            onClick={() => {
              setSelectedCardId(card.id)
              messageInput.onChange({ target: { value: card.defaultTextMessage } } as any)
            }}
            isSelected={selectedCardId === card.id}
          />
        ))}
      </CardSelector>

      <MainImage src={selectedCard?.imageUrl} alt="선택된 메시지 카드" />

      <OrderField
        label="메시지"
        as="textarea"
        value={messageInput.value}
        onChange={messageInput.onChange}
        onBlur={messageInput.onBlur}
        placeholder="축하 메시지를 입력하세요."
        error={messageInput.error}
      />

      <Section>
        <OrderField
          label="보내는 사람"
          value={senderInput.value}
          onChange={senderInput.onChange}
          onBlur={senderInput.onBlur}
          placeholder="이름을 입력하세요."
          error={senderInput.error}
        />
        {!senderInput.error && (
          <Note>* 실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다.</Note>
        )}
      </Section>

      <Section>
        <Label>받는 사람</Label>
        <OrderField
          label="이름"
          value={receiverNameInput.value}
          onChange={receiverNameInput.onChange}
          onBlur={receiverNameInput.onBlur}
          placeholder="이름을 입력하세요."
          error={receiverNameInput.error}
        />
        <OrderField
          label="전화번호"
          value={receiverPhoneInput.value}
          onChange={receiverPhoneInput.onChange}
          onBlur={receiverPhoneInput.onBlur}
          placeholder="전화번호를 입력하세요."
          error={receiverPhoneInput.error}
        />
        <OrderField
          label="수량"
          type="number"
          min={1}
          value={quantityInput.value}
          onChange={quantityInput.onChange}
          onBlur={quantityInput.onBlur}
          placeholder="수량"
          error={quantityInput.error}
        />
      </Section>

      <Section>
        <Label>상품 정보</Label>
        <ProductInfo>
          <img src={product.imageURL} alt={product.name} />
          <div>
            <div>{product.name}</div>
            <div>{product.brandInfo.name}</div>
            <div><strong>{product.price.sellingPrice.toLocaleString()}원</strong></div>
          </div>
        </ProductInfo>
      </Section>

      <OrderButton onClick={handleSubmit}>
        {(product.price.sellingPrice * Number(quantityInput.value)).toLocaleString()}원 주문하기
      </OrderButton>
    </Wrapper>
  )
}

export default OrderPage