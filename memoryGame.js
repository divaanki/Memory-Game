class cardGame
{
    constructor( flipcount, cards)
    {
        this.cardsArray = cards;
        this.totalFlips = flipcount;
        this.flipsRemain = flipcount;
        this.timer = document.getElementById('time');
        this.ticker = document.getElementById('flips-remaining');
    }

    startGame()
    {
        this.cardToCheck = null;
        this.flipsRemain = this.totalFlips;
        this.matchedCards = [];
        this.busy = true;
        this.timer.innerHTML = '00:00';
        this.ticker.innerHTML = this.totalFlips;

        setTimeout(()=>
        {
            this.timeTaken = this.time(); 
            this.shuffle();
            this.busy = false;
        }, 500); 
        
        this.ticker.innerHTML = this.flipsRemain;
    }

    reset()
    {
        this.cardsArray.forEach(card =>
            {
                card.style.transform = 'scale(95%, 95%)';
            });
    }

    time()
    {
        let secs = 0;
        let mins = 0;
        let SS, MM;

        return setInterval(()=>
        {
            secs++;
            if(secs==60) { secs=0; mins++;} 

            secs<10?SS = `0${secs}`:SS= `${secs}`
            mins<10?MM = `0${mins}`:MM= `${mins}`

            this.timer.innerHTML = `${MM}:${SS}`
        }, 1000);
    }

    shuffle()
    {
        var images= document.querySelectorAll('.card-front>img');
        let srcs=[
            'Card_pictures\\pic1.png',
            'Card_pictures\\pic1.png',
            'Card_pictures\\pic3.png',
            'Card_pictures\\pic3.png',
            'Card_pictures\\pic4.png',
            'Card_pictures\\pic4.png',
            'Card_pictures\\pic5.png',
            'Card_pictures\\pic5.png',
            'Card_pictures\\pic6.png',
            'Card_pictures\\pic6.png',
            'Card_pictures\\pic7.png',
            'Card_pictures\\pic7.png',
            'Card_pictures\\pic8.png',
            'Card_pictures\\pic8.png',
            'Card_pictures\\pic9.png',
            'Card_pictures\\pic9.png',
        ]
        
        for(let i=srcs.length-1; i>=0; i--)
        {
            let j = Math.floor(Math.random() * i);
            let temp = srcs[i];
            srcs[i] = srcs[j];
            srcs[j] = temp;
        }
        
        for(let i=0; i<images.length; i++)
        {
            images[i].src = srcs[i];
        }
    }

    flipCard(card)
    {
        if(this.canFlip(card))
        {
            this.flipsRemain--;
            this.ticker.innerHTML = this.flipsRemain;
            card.style.transform = 'scale(95%, 95%) rotateY(180deg)';
            
            if(this.cardToCheck)
            {
                this.checkForMatch(card);
            }
            else
            {
                this.cardToCheck = card;
            }
                
            if(this.flipsRemain === 0)
                this.gameOver();
        }
    }

    checkForMatch(card)
    {
        if(this.getValue(card) === this.getValue(this.cardToCheck))
            this.matched(card, this.cardToCheck);
        else
            this.misMatched(card, this.cardToCheck);    

        this.cardToCheck = null;    
    }

    getValue(card)
    {
        return card.querySelector('.card-front > img').src;
    }

    misMatched(card1, card2)
    {
        this.busy = true;
        setTimeout(() =>
        {
            card1.style.transform = 'scale(95%, 95%)';
            card2.style.transform = 'scale(95%, 95%)';
            this.busy = false;
        }, 1000);
    }

    matched(card1, card2)
    {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        
        if(this.matchedCards.length == this.cardsArray.length)
            this.victory();
    }
    
    gameOver()
    {
        clearInterval(this.timeTaken);
        document.getElementById('game-over').classList.add('visible'); 
        this.reset();
    }

    victory()
    {
        clearInterval(this.timeTaken);
        document.getElementById('victory').classList.add('visible'); 
        this.reset();
    }

    canFlip(card)
    {
        //return true;
        return (!this.busy && !this.matchedCards.includes(card) && card!==this.cardToCheck);   
    }
}

function ready()
{
    let overlays = document.querySelectorAll('.overlay-text');
    let cards = document.querySelectorAll('.card-face');

    let game = new cardGame(40, cards);

    overlays.forEach(overlay => 
        {
            overlay.addEventListener('click', ()=>
            {
                overlay.classList.remove('visible');
                game.startGame();
            });
        });

    cards.forEach(card =>{
        card.addEventListener('click', ()=>
        {
            game.flipCard(card);
        });
    });     
}

if(document.readyState === 'loading')
{
    document.addEventListener('DOMContentLoaded', ready());
}
else
{
    ready();
}
