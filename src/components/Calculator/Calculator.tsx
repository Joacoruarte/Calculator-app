import React, { useState } from "react";
import styled from "styled-components";
import statusImage from "../../assets/status.png";
import { useGetTime } from "../../hooks/useGetTime";
import { Button } from "./Button";

const Calculator: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState<number | string>(0);
  const [secondNumber, setSecondNumber] = useState<number | string>(0);
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState<number | string>(0);
  const [isFirstNumber, setIsFirstNumber] = useState(true);
  const [isOperator, setIsOperator] = useState(false);
  const [isSecondNumber, setIsSecondNumber] = useState(false);
  const hour = useGetTime()

  const handleConcatNumbers = (prev: number | string , next: number) => {
    if(typeof prev === 'string' && prev.includes('.')){
      let number = prev.toString() + next.toString()
      if(number.split('.').join("").length > 9){
        return prev.toString()
      }
      return number
    }else{
      let number = parseFloat(prev.toString() + next.toString())
      if(number > 999999999){
        return parseFloat(prev.toString())
      }else{
        return number
      } 
    }
  }
  
  const handleNumber = (number: number) => {
    if(isFirstNumber){
        setFirstNumber(prev => handleConcatNumbers(prev, number))
        setResult(prev => handleConcatNumbers(prev, number))
    }else if(isSecondNumber){
        setIsOperator(false)
        setSecondNumber(prev => { 
          setResult(handleConcatNumbers(prev, number))
          return handleConcatNumbers(prev, number)
        })
    }
  }

  const handleConcatFloat = () => {
    if(isFirstNumber){
      setFirstNumber(prev => prev.toString() + '.')
      setResult(prev => prev.toString() + '.')
    }else if(isSecondNumber){
      setSecondNumber(prev => prev.toString() + '.')
      setResult(prev => prev.toString() + '.')
    }
  }

  const handleOperator = (op: string) => {
    if(firstNumber !== 0 && secondNumber !== 0) {
      handleResult();
    }
    setOperator(op);
    setIsOperator(true);
  
    if(op === '%') {
      if(typeof firstNumber === 'number'){
        setFirstNumber(firstNumber * 0.01);
        setResult(firstNumber * 0.01);
      }
    } else {
      setIsFirstNumber(false);
      setIsSecondNumber(true);
    }
  };

  const handleResult = () => {
    const calculate = (a: number | string, b: number | string, op: string): number => {
      const x = typeof a === 'number' ? a : parseFloat(a);
      const y = typeof b === 'number' ? b : parseFloat(b);
      
      switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '✖': return x * y;
        case '÷': return x / y;
        case '%': return x * y / 100;
        default: return 0;
      }
    };
    
    setResult(calculate(firstNumber, secondNumber, operator));
    setFirstNumber(calculate(firstNumber, secondNumber, operator));
    setSecondNumber(0);
  };

  function convertToOpposite(num: number | string): number | string {
    const numAsNumber = parseFloat(num.toString().replace(/,/g, ''));
    if (numAsNumber > 0) {
      return -numAsNumber;
    } else if (numAsNumber < 0) {
      return Math.abs(numAsNumber);
    } else {
      return num === '-0' ? 0 : '-0';
    }
  }

  const handleChangeOpposite= () => {
    if(isFirstNumber){
      setFirstNumber(convertToOpposite)
      setResult(convertToOpposite)
    }else if(isSecondNumber){
      setSecondNumber(convertToOpposite)
      setResult(convertToOpposite)
    }
  }

  const handleResetResult = () => {
    setFirstNumber(0)
    setSecondNumber(0)
    setIsFirstNumber(true)
    setIsSecondNumber(false)
    setIsOperator(false)
    setOperator("")
    setResult(0)
  }

  const showResult = () => {
    if(typeof result === 'number'){
      if(result.toString().includes('.')){
        return parseFloat(parseFloat(result.toString()).toFixed(4)).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true })
      }
      return parseFloat(parseFloat(result.toString()).toFixed(4)).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true })
    }else{
      if(result.includes('.')){
        return parseInt(result.split('.')[0]).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true }) + `,${result.split('.')[1]}`
      }else{
        return result
      }
    }
  }

  return (
    <ContainerCalculator>
      <Hour>{hour}</Hour>
      <Status src={statusImage}/>
      {/* PANEL */}
      <Panel>
        <span>{showResult()}</span>
      </Panel>

      <ContainerButtons>
        {/* OPERATORS */}
        <Button onClick={handleResetResult} backgroundColor="#A6A6A4" hoverColor="#c0c0ba" color="#000">{result > 0 ? 'C' : 'AC'}</Button>
        <Button onClick={()=> handleChangeOpposite()} backgroundColor="#A6A6A4" hoverColor="#c0c0ba" color="#000">+/-</Button>
        <Button onClick={()=> handleOperator('%')} backgroundColor="#A6A6A4" hoverColor="#c0c0ba" color="#000">%</Button>
        <Button onClick={()=> handleOperator('÷')} selected={operator === '÷' && isOperator} backgroundColor="#FF9F00" hoverColor="#f1b34e" fontSize="35px" padding="0 0 0px 0">÷</Button>
        {/* NUMBERS */}
        <Button onClick={()=> handleNumber(7)} fontSize="24px">7</Button>
        <Button onClick={()=> handleNumber(8)} fontSize="24px">8</Button>
        <Button onClick={()=> handleNumber(9)} fontSize="24px">9</Button>
        {/* OPERATOR */}
        <Button onClick={()=> handleOperator('✖')} selected={operator === '✖' && isOperator} backgroundColor="#FF9F00" hoverColor="#f1b34e" >✖</Button>
        {/* NUMBERS */}
        <Button onClick={()=> handleNumber(4)} fontSize="24px">4</Button>
        <Button onClick={()=> handleNumber(5)} fontSize="24px">5</Button>
        <Button onClick={()=> handleNumber(6)} fontSize="24px">6</Button>
        <Button onClick={()=> handleOperator('-')} selected={operator === '-' && isOperator} backgroundColor="#FF9F00" hoverColor="#f1b34e" fontSize="45px" padding="0 0 6px 0">-</Button>
        {/* NUMBERS */}
        <Button onClick={()=> handleNumber(1)} fontSize="24px">1</Button>
        <Button onClick={()=> handleNumber(2)} fontSize="24px">2</Button>
        <Button onClick={()=> handleNumber(3)} fontSize="24px">3</Button>
        {/* OPERATOR */}
        <Button onClick={()=> handleOperator('+')} selected={operator === '+' && isOperator} backgroundColor="#FF9F00" hoverColor="#f1b34e" fontSize="35px">+</Button>
        <Button onClick={()=> handleNumber(0)} justifyContent="flex-start" padding="0 0 0 24px" width="130px" borderRadius="30px" fontSize="24px">0</Button>
        <Button onClick={()=> handleConcatFloat()} fontSize="24px">.</Button>
        {/* OPERATOR */}
        <Button onClick={handleResult} backgroundColor="#FF9F00" hoverColor="#f1b34e" fontSize="35px">=</Button>
      </ContainerButtons>
    </ContainerCalculator>
  );
};

export default Calculator;

const ContainerCalculator = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 30px;
  width: 320px;
  height: max-content;
  padding-bottom: 2rem;
  background-color: #231e20;
`;

const Panel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 40px;
  width: 100%;
  height: 180px;

  span {
    font-size: 50px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 1rem;
  gap: 10px;
`;

const Hour = styled.span`
  position: absolute;
  top: 10px;
  left: 20px;
`

const Status = styled.img`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 70px;
  height: 20px;
  object-fit: contain;
`
