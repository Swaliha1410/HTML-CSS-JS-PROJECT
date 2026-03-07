let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset")
let msgcontainer=document.querySelector(".msg-container")
let msg=document.querySelector(".msg")

let turn0=true;   
// #player 1

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
//2 d array

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        console.log("clicking!!")
        if(turn0) //player o turn start
        {
        box.innerHTML="O"//choice tap
        turn0=false;//then stop 

        }
        else
        {
        box.innerHTML="X"
        turn0=true;
        }
        box.disabled=true
        let winner = checkWinner();
        if (!winner && allBoxesFilled()) {
            showTie();
        }
    })    

});
const disableBoxes =() =>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}
const enableBoxes =() =>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerHTML="";
        box.style.color=""; // Reset color
        box.style.backgroundColor=""; // Reset background
        box.classList.remove("winner"); // Remove winner class
    }
}

const showWinner=(winner) =>{
    msg.innerHTML=`Congratulations!!,Winner is ${winner}`
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const showTie=() =>{
    msg.innerHTML="It's a Tie!"
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const allBoxesFilled = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
}

const checkWinner=() => {
    for(let pattern of winpatterns)
    {
    //    console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
    //    console.log([pattern[0]],[pattern[1]],[pattern[2]]);
    
    let pos1val=boxes[pattern[0]].innerText;
    let pos2val=boxes[pattern[1]].innerText;
    let pos3val=boxes[pattern[2]].innerText;

    if(pos1val !="" && pos2val!="" && pos3val!=="")
    {
        if(pos1val==pos2val && pos2val== pos3val)
        {
            console.log("winner",pos1val)
            boxes[pattern[0]].classList.add("winner");
            boxes[pattern[1]].classList.add("winner");
            boxes[pattern[2]].classList.add("winner");
            showWinner(pos1val);
            return true;
        }

    }
    }
    return false;
}

const resetgame =() =>{
    turn0=true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}

resetbtn.addEventListener("click",resetgame);