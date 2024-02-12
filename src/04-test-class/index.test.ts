import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let anotherBankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(1000);
    anotherBankAccount = getBankAccount(0);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(2000);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(2000, anotherBankAccount);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(2000, bankAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(1000);
    expect(bankAccount.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(500);
    expect(bankAccount.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    bankAccount.transfer(900, anotherBankAccount);
    expect(bankAccount.getBalance()).toBe(100);
    expect(anotherBankAccount.getBalance()).toBe(900);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(1000);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
