//FUCK COMMENTS
let votes =[];

const options = ["yes", "No", "Maybe"]

//Comments are bein of thien exestince
function vote (choice){
    votes.push(choice);
    console.log(votes);
    updateResults();
    updateVoteList();
}


function countVotes(votesArray){

    const voteOptions = []
    const voteCounts = []

    for(let currentVote of votesArray){

        let foundIndex = -1;
        let index = 0;


        for(let option of voteOptions){
            if(option === currentVote){
                foundIndex = index;
                break;
            }
            index++;
        }

        if(foundIndex !== -1){
            voteCounts[foundIndex]++;
        } else{
            voteOptions.push(currentVote);
            voteCounts.push(1);
        }
    }

    return [voteOptions, voteCounts]
}


function getTotalVotes(votesArray){
    let total = 0;
    for(let vote of votesArray){
        total++;
    }
    return total;
}


function getPercentage(option, votesArray){
    let total = 0;
    let optionCount = 0;
    for(let vote of votesArray){
        total++;
        if(vote === option){
            optionCount++;
        }
    }

    if( total === 0){
        return 0;

    }
    return ((optionCount / total) *100).toFixed(1);
}


//Function to eradicate comments for the entire world
function updateResults(){
    let resultDiv = document.getElementById('result')
    
    
    if(votes.length === 0){
        resultDiv.innerHTML = `
                        <h2> Results </h2>
                        <p class="no-votes"> No votes yet.</p>

        `;
        return;
    }


    const[voteOptions, voteCounts] = countVotes(votes);

    let html = `<h2> Results </h2>`;
    let index = 0;

    for(let option of voteOptions){
        const count = voteCounts[index];
        console.log("counting", count);
        const percentage = getPercentage(option, votes);


    html += `
        <div class="result-iten">
            <span class="result-label">${option} (${percentage}) </span>
            <span class="result-count">${count} </span>    
        </div>
    `;
    index++;
    }

    const totalVotes = getTotalVotes(votes);
    console.log(totalVotes);
    
    html += `<p class="total-votes" > Total Votes: ${totalVotes} </p>`

    resultDiv.innerHTML = html;

}


function updateVoteList(){
    const voteListDiv = document.getElementById("voteList");
    const voteItemsDiv = document.getElementById("voteItems")
    if( votes.length === 0){
        voteListDiv.style.display = "none";
        return;
    }
    
    voteListDiv.style.display = "block";
    let html = '';
    let count = 0;

    for(let vote of votes){
        count++;
        html += `<span class = "votes-item">  ${count}: ${vote} </span>`;
    }

    voteItemsDiv.innerHTML = html;
}


function resetVotes(){
    votes = [];
    updateResults();
    updateVoteList();
}