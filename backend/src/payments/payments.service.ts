import { Injectable } from "@nestjs/common";
import * as QRCode from "qrcode";
@Injectable()
export class PaymentsService {
  async createPixPayment() {
    const copyPasteCode =
      "00020126360014BR.GOV.BCB.PIX0114+55219907226755204000053039865802BR5904Igor6014Rio de janeiro62070503***630433DD";
    const qrCodeImageBase64 = await QRCode.toDataURL(copyPasteCode);

    return {
      qr_code_image_base64: qrCodeImageBase64,
      qr_code_copy_paste: copyPasteCode,
    };
  }
}
