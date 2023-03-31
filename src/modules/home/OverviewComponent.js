import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
align-items: center;
font-family : Montserrat;
font-size: 16px;
width:100%;
`;

const ExpenseContainer = styled.div`
display: flex;
flex-direction: row;
gap: 12px;
margin: 20px;
`;

const ExpenseBox = styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid #e6e8e9;
padding: 15px 20px;
font-size: 14px;
gap:10px;
width: 135px;
& span 
{
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isIncome ? "green" : "red")};
}
`;

const BalanceBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
font-size: 20px;
align-items:center;
width:100%;
font-weight: bold;
& span 
{
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
}
`;

const AddTransaction = styled.button`
background: black;
color: white;
// display: flex;
padding: 5px 10px;
cursor: pointer;
// flex-direction: row;
border-radius: 4px;
text-align: center;
font-weight: bold;
font-size: 15px;
`;
const AddTransactionContainer = styled.div`
// font-size: 15px;
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid #e6e8e9;
width:100%;
padding: 15px 20px;
margin: 20px;
gap: 10px; 
& input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
}
`;

const RadioBox = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
 & input {
width: unset;
margin: 0 10px;
}
`;


const AddTransactionView = (props) => {
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");
    const addTransaction = () => {
        props.addTransaction({
            amount:Number(amount),
            desc,
            type,
            id:Date.now(),
        });
        props.toggleAddTxn();
    };
return(
<AddTransactionContainer>
        <input 
        placeholder="Amount" 
        value={amount} 
        type="number" 
        onChange ={(e) => setAmount(e.target.value)}
        />
        <input 
        placeholder="Description" 
        value={desc} 
        onChange ={(e) => setDesc(e.target.value)}
/>

<RadioBox>
    <input 
    type="radio" 
    id="expense" 
    name="type"
    value="EXPENSE" 
    checked={type === "EXPENSE"} 
    onChange={(e) => setType(e.target.value)}
    />
<label htmlFor="expense">Expense</label>

<input 
type="radio" 
id="income" 
name="type"
value="INCOME" 
checked={type === "INCOME"} 
onChange={(e) => setType(e.target.value)}
/>
<label htmlFor="income">Income</label>
 </RadioBox>
 
 <AddTransaction 
 onClick={() => 
 props.addTransaction({
    id:Date.now(),
    amount: Number(amount),
    desc,
    type,
 })}
 >
    Add Transaction
    </AddTransaction>
    </AddTransactionContainer>
);
};



const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false);
return (
    <Container>
        <BalanceBox>
        Balance:  ${props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
            {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransaction>
        </BalanceBox>
        {isAddTxnVisible && (
        <AddTransactionView 
            toggleAddTxn ={toggleAddTxn}
            addTransaction={props.addTransaction}
 
    
        />
        )}
        <ExpenseContainer>
<ExpenseBox isIncome={false}>
    Expense<span>${props.expense}</span>
</ExpenseBox>
<ExpenseBox isIncome={true}>
    Income<span>${props.income}</span>
</ExpenseBox>
        </ExpenseContainer>
        </Container>
);
};
export default OverviewComponent