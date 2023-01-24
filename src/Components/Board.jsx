import React,{useState} from 'react';
import '../App.css';
import Box from './Box';
import successclick from '../Assets/selectaudio.wav';
import wrongclick from '../Assets/button-4.wav';
import { useEffect } from 'react';
import victoryEffect from '../Assets/victory.mp3';
export default function Board() {

    let initialmsg={
        msgtitile:"Start Game",
        msgParaForStates:"Welcome to our Tic Tac Toe Game Users In this game two players can play at a time and Player 1 has 'O' and Player has 'X'",
        buttontitle:"Start Game"
    }
    const [data,setData]=useState(Array(9).fill(null));
    const [xTurn,setIsXTurn]=useState(false);
    const [gameRun,setGameRun]=useState(false);
    const [gameMsg,setGameMsg]=useState(initialmsg.msgtitile);
    const [msgpara,setmsgPara]=useState(initialmsg.msgParaForStates);
    const [buttonText,setbuttonText]=useState(initialmsg.buttontitle);
    const [win,setwin]=useState(false);
    const [tie,setTie]=useState(false);
let handleClick=(index)=>
    {
        // console.log("Clicked!");
        if(data[index]===null)
        {
            new Audio(successclick).play();
            let tempdata=[...data];
            tempdata[index]=xTurn?"X":"O";
            setData(tempdata);
            setIsXTurn(!xTurn);
        }
        else
        {
            new Audio(wrongclick).play();
        }
    }
    // Reset Function
const reset=()=>
    {
        setData(Array(9).fill(null));
        setIsXTurn(false);
        setGameRun(false);
        setGameMsg(initialmsg.msgtitile);
        setmsgPara(initialmsg.msgParaForStates);
        setbuttonText(initialmsg.buttontitle);

    }
    useEffect(()=>{
        setwin(checkWinner());
        setTie(matchTie());
        if(win!==false)
        {
            setGameRun(false);
            setGameMsg("Game Won");
            setmsgPara(`Game Won By Player ${win}`)
            setbuttonText("Restart");
        }
        else if(tie!==false)
        {
            setGameRun(false);
            setGameMsg("Match Tie!");
            setmsgPara("No More Moves in this match Please Play Again");
            setbuttonText("Play Again!");
        }
    })
    // /Match Tie Logic
    const matchTie=()=>{
        let chance=0;
        for(let index=0;index<9;index++)
        {
            if(data[index]!==null)
            {
                chance++;
            }
        }
        if(chance>=9)
        {
            return true;
        }
        return false;
    }
    // Winner Logic
const checkWinner = () => 
    {
        const winnerLogic = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
    
        for (let logic of winnerLogic) {
          const [a, b, c] = logic;
          if (data[a] !== null &&data[a] ===data[b] &&data[a] ===data[c]) 
          {
            new Audio(victoryEffect).play();
            // setGameRun(false);
            return data[a];
          }
        }
    
        return false;
    }
const buttonChangeFunc=()=>{
    if(buttonText==="Restart" || buttonText==="Play Again!") 
    {
        reset();
    }
    else if(buttonText==="Start Game")
    {
        setGameRun(true);
        setData(Array(9).fill(null))
    }
}
return (
    <>    
    <div className='Board'>
        {gameRun?
        <div className="boardbox">
            <div className="row1">
                <Box dataValue={data[0]} clickFunc={()=>{handleClick(0)}}/>
                <Box dataValue={data[1]} clickFunc={()=>{handleClick(1)}}/>
                <Box dataValue={data[2]} clickFunc={()=>{handleClick(2)}}/>
            </div>
            <div className="row2">
                <Box dataValue={data[3]} clickFunc={()=>{handleClick(3)}}/>
                <Box dataValue={data[4]} clickFunc={()=>{handleClick(4)}}/>
                <Box dataValue={data[5]} clickFunc={()=>{handleClick(5)}}/>
            </div>
            <div className="row3">
                <Box dataValue={data[6]} clickFunc={()=>{handleClick(6)}}/>
                <Box dataValue={data[7]} clickFunc={()=>{handleClick(7)}}/>
                <Box dataValue={data[8]} clickFunc={()=>{handleClick(8)}}/>
            </div>
        </div>:
         <div className="messagebox">
            <h1>{gameMsg}</h1>
            <p>{msgpara}</p>
            <div className="buttonmsg"><button onClick={buttonChangeFunc}>{buttonText}</button></div>
            </div>}
    </div>
    <div className="gameinfo">
        <h4>Turn: {xTurn?"Player 2 'O'":"Player 1 'X'"}</h4>
        <button onClick={reset}>Reset</button>
    </div>
    </>
  )
}
