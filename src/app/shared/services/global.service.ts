import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

import { CryptoIV, CyptoKey } from '@env/environment';
import { RSAConfig } from '@constants/rsa-config';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private toast: HotToastService) {}
  private key = CryptoJS.enc.Utf8.parse(CyptoKey);
  private iv = CryptoJS.enc.Utf8.parse(CryptoIV);

  Encrypt(value: string, type: 'AES' | 'RSA') {
    switch (type) {
      case 'AES': {
        const encryptedValue = CryptoJS.AES.encrypt(value, this.key, {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const encodedEncryptedValue = encodeURIComponent(
          encryptedValue.toString()
        );
        return encodedEncryptedValue.toString();
      }
      case 'RSA': {
        const RSAEncrypt = new JSEncrypt();
        RSAEncrypt.setPublicKey(RSAConfig.PUBLIC_KEY);
        const EncryptedValue = RSAEncrypt.encrypt(value);
        return EncryptedValue;
      }
      default:
        return '';
    }
  }
  Decrypt(EncryptedValue: string, type: 'AES' | 'RSA') {
    switch (type) {
      case 'AES': {
        const decodedEncryptedValue = decodeURIComponent(EncryptedValue);
        const decryptedValue = CryptoJS.AES.decrypt(
          decodedEncryptedValue,
          this.key,
          {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }
        );
        return decryptedValue.toString(CryptoJS.enc.Utf8);
      }
      case 'RSA': {
        const RSAEncrypt = new JSEncrypt();
        RSAEncrypt.setPrivateKey(RSAConfig.PRIVATE_KEY);
        const decryptedValue = RSAEncrypt.decrypt(EncryptedValue);
        return decryptedValue;
      }
      default:
        return '';
    }
  }
  setEncryptedLocalStorageItem(key: string, value: string) {
    const encryptedValue = this.Encrypt(value, 'AES').toString();
    localStorage.setItem(key, encryptedValue);
  }
  getDecryptedLocalStorageItem(key: string) {
    const encryptedValue = localStorage.getItem(key);
    return encryptedValue
      ? JSON.parse(this.Decrypt(encryptedValue, 'AES').toString())
      : null;
  }
  triggerToastMessage(
    type: 'html' | 'success' | 'info' | 'error' | 'warning',
    message: string,
    style: Record<string, any> = {}
  ) {
    const duration = 5000; // in millseconds
    this.toast.close();
    switch (type) {
      case 'html':
        this.toast.show(message, {
          duration,
          autoClose: false,
          dismissible: true,
          style,
        });
        break;
      case 'info':
        this.toast.info(message, { duration, style, dismissible: true });
        break;
      case 'error':
        this.toast.error(message, { duration, style, dismissible: true });
        break;
      case 'warning':
        this.toast.warning(message, { duration, style, dismissible: true });
        break;
      default:
        this.toast.success(message, { duration, style, dismissible: true });
    }
  }
}
