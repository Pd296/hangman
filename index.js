 const wordEl = document.getElementById('word');
 const wrongLetterEl = document.getElementById('wrong-letters');
 const playAgainBtn = document.getElementById('play-again');
 const popup= document.getElementById('popup-container');
 const notification= document.getElementById('notification-container');
 const finalMessage= document.getElementById('final-message');

const figureParts= document.querySelectorAll('.figure-part');

const words=['hello','world','software','congruence','lackadaicical'];

let selectedWord = words[Math.floor(Math.random()* words.length)];

const correctLetters=[];
const wrongLetters=[];

function displayWord(){
    wordEl.innerHTML=`
    ${selectedWord
    .split('')
    .map(letter => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>`).join('') 
   }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if(innerWord == selectedWord){
        finalMessage.innerText = 'Congratulations! You Won ';
        popup.style.display='flex';
    }
}

//keydown letter press
window.addEventListener('keydown', e =>{
    if(e.key>='a' && e.key<='z'){
        const letter=e.key;

        if(selectedWord.includes(letter) ){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
               showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }else{
                showNotification();
            }
  
        }
 
    }     
})


//update wrong letters
function updateWrongLettersEl(){


    //display wrong letters
   wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(
        letter => `<span>${letter}</span>`)}
    
   `;


   //display parts
   figureParts.forEach((part,index) => {
    const errors=wrongLetters.length;
    if(index < errors){
        part.style.display='block';
    }else{
        part.style.display='none';
    }
   })

   //check if lost 
if(wrongLetters.length == figureParts.length){
    finalMessage.innerText = 'You Lost :/';
    popup.style.display='flex';
}

}

//show notification 
function showNotification(){
    notification.classList.add('show');
    setTimeout( () => {
    notification.classList.remove('show');
    },1500)
}


//restart game and play again 
playAgainBtn.addEventListener('click',() => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display='none';
})
displayWord();