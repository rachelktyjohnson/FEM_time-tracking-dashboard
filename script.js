fetch('data.json')
    .then(data => data.json())
    .then(data => {
        let all_time_cards="";
        console.log(data);
        data.map((category) => {
            let slug = category.title.toLowerCase().replaceAll(" ", "-")
            let img_url = `images/icon-${slug}.svg`;
            let time_card = `
            <section 
                class="time-card ${slug}"
                style="
                    background:${category.color};
                    background-image: url(${img_url});
                    background-position: top -10px right 15px;
                    background-repeat: no-repeat;
                "
            >
                <div class="content">
                    <div class="title">
                        <h2>${category.title}</h2>
                        <img src="images/icon-ellipsis.svg" alt="ellipsis"/>
                    </div>
                    <div class="data">
                        <p class="current-hours">${category.timeframes.weekly.current}hrs</p>
                        <p class="previous-hours"> Last week - ${category.timeframes.weekly.previous}hrs</p>
                    </div>

                </div>
            </section>
            `
            all_time_cards += time_card;
        })
        document.querySelector(".time-card-container").innerHTML = all_time_cards;
    })


const time_period = document.querySelector(".time-period");


function changeTimePeriod(el){
    //remove active class from everyone
    [...time_period.children].map((child)=>{
        child.classList.remove("active");
    })

    //add active class to clicked item
    el.target.classList.add("active");

    fetch('data.json')
        .then(data => data.json())
        .then(data => {
            data.forEach((category)=>{
                let slug = category.title.toLowerCase().replaceAll(" ", "-")
                let timeframe_data = category.timeframes[el.target.id]
                document.querySelector(`.${slug} .content .data .current-hours`).innerText = `${timeframe_data.current}hrs`
                let last_timeframe;
                if (el.target.id === "daily"){
                    last_timeframe = "Yesterday"
                } else if (el.target.id === "weekly"){
                    last_timeframe = "Last week";
                } else {
                    last_timeframe = "Last month"
                }
                document.querySelector(`.${slug} .content .data .previous-hours`).innerText = `${last_timeframe} - ${timeframe_data.previous}hrs`
            })
        })
    //match to fetched data with index
    //find the timeframe that matches el.target.id
    //change contents of card's current hours and previous hours
}

//assign event listeners to each time period button
[...time_period.children].map((child)=>{
    child.addEventListener('click', (el) => {
        changeTimePeriod(el)
    })
})