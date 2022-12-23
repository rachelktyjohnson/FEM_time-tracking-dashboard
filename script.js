fetch('data.json')
    .then(data => data.json())
    .then(data => {
        let all_time_cards;
        data.forEach((category) => {
            let slug = category.title.toLowerCase().replaceAll(" ", "-")
            let time_card = `
            <section 
                class="time-card ${slug}"
                style="
                    background:${category.color};
                    background-image: url('images/icon-${slug}.svg');
                    background-position: top -15px right 15px;
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


