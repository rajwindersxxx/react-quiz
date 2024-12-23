import { useReducer } from 'react';
import './challenge.css';
const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  depositInput: 0,
  withdrawInput: 0,
  requestLoanInput: 0,
  payLoanInput: 0,
};

function Challenge() {
  function reducer(state, action) {
    switch (action.type) {
      case 'openAccount':
        return { ...state, balance: 500, isActive: true };
      case 'deposit':
        return { ...state, balance: state.balance + state.depositInput };
      case 'withdraw':
        if (state.balance <= state.withdrawInput)
            return { ...state };
        return {
          ...state,
          balance:
            state.balance > 0
              ? state.balance - state.withdrawInput
              : state.balance,
        };
      case 'requestLoan':
        return {
          ...state,
          balance: !state.loan
            ? state.balance + state.requestLoanInput
            : state.balance,
          loan: action.payload,
        };
      case 'payLoan':
        if (state.balance <= state.loan || state.loan === 0)
          return { ...state };
        return {
          ...state,
          loan:
            state.balance >= state.loan
              ? state.loan - state.payLoanInput
              : state.loan,
          balance:
            state.balance >= state.loan
              ? state.balance - state.payLoanInput
              : state.balance,
        };
      case 'closeAccount':
        if (state.balance === 0 && state.loan === 0) {
          return { ...state, ...initialState };
        }
        return { ...state };
      case 'depositInput':
        return { ...state, depositInput: action.payload };
      case 'withdrawInput':
        return { ...state, withdrawInput: action.payload };
      case 'requestLoanInput':
        return { ...state, requestLoanInput: action.payload };
      case 'payLoanInput':
        return { ...state, payLoanInput: action.payload };
      default:
        return { ...state };
    }
  }
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: 'openAccount' });
          }}
          disabled={false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'deposit', payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit
        </button>
        <input
          type="number"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({ type: 'depositInput', payload: Number(e.target.value) })
          }
        />
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'withdraw', payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw
        </button>
        <input
          type="number"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({ type: 'withdrawInput', payload: Number(e.target.value) })
          }
        />
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'requestLoan', payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan
        </button>
        <input
          type="number"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({
              type: 'requestLoanInput',
              payload: Number(e.target.value),
            })
          }
        />
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'payLoan', payload: 5000 });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
        <input
          type="number"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({ type: 'payLoanInput', payload: Number(e.target.value) })
          }
        />
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'closeAccount' });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default Challenge;
/*!
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
