function updateCountdown() {
    var targetDate = new Date('2024-10-18T00:00:00');
    var now = new Date();
    var timeDifference = targetDate - now;

    if (timeDifference < 0) {
        document.getElementById('countdown').innerHTML = "EXPIRED";
        return;
    }

    var months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    timeDifference -= months * (1000 * 60 * 60 * 24 * 30);

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    timeDifference -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(timeDifference / (1000 * 60 * 60));

    document.getElementById('countdown').innerHTML = "" + months + " months, " + days + " days and " + hours + " hours to go!";
}

// Update the countdown every hour
setInterval(updateCountdown, 3600000);
updateCountdown(); // Initial call to set the timer immediately
