export class CreateTransactionDto {
  id: number
  type: string
  objectId: string
  url: string
  data: {
    id: number
    amount: number
    refundedAmount: number
    companyId: number
    installments: number
    paymentMethod: string
    status: string
    postbackUrl: any
    metadata: any
    traceable: boolean
    secureId: string
    secureUrl: string
    createdAt: string
    updatedAt: string
    paidAt: string
    ip: any
    externalRef: any
    customer: {
      id: number
      externalRef: any
      name: string
      email: string
      phone: string
      birthdate: any
      createdAt: string
      document: {
        number: string
        type: string
      }
      address: {
        street: string
        streetNumber: string
        complement: any
        zipCode: string
        neighborhood: string
        city: string
        state: string
        country: string
      }
    }
    card: {
      id: number
      brand: string
      holderName: string
      lastDigits: string
      expirationMonth: number
      expirationYear: number
      reusable: boolean
      createdAt: string
    }
    items: Array<{
      externalRef: any
      title: string
      unitPrice: number
      quantity: number
      tangible: boolean
    }>
    splits: Array<{
      recipientId: number
      amount: number
      netAmount: number
    }>
    fee: {
      fixedAmount: number
      spreadPercentage: number
      estimatedFee: number
      netAmount: number
    }
  }
}
