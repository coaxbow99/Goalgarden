document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // SYSTEM 1: END OF DAY SUMMARY INPUT MONITOR LOGIC
    // ----------------------------------------------------
    const earned = document.getElementById("earnedInput");
    const spent = document.getElementById("spentInput");
    const display = document.getElementById("netSavingsDisplay");

    if (earned && spent) {
        function calculateNet() {
            const eValue = parseInt(earned.value) || 0;
            const sValue = parseInt(spent.value) || 0;
            const net = eValue - sValue;
            
            if(net >= 0) {
                display.innerText = "+ ₹" + net;
                display.style.color = "#2e7d32";
            } else {
                display.innerText = "- ₹" + Math.abs(net);
                display.style.color = "#c62828";
            }
        }
        earned.addEventListener("input", calculateNet);
        spent.addEventListener("input", calculateNet);
    }

    // ----------------------------------------------------
    // SYSTEM 2: CALENDAR DASHBOARD PROGRESS FILL LOGIC
    // ----------------------------------------------------
    const goalStatusText = document.getElementById("goalStatusText");
    const savingsProgressValue = document.getElementById("savingsProgressValue");
    const progressBarFill = document.getElementById("progressBarFill");

    if (goalStatusText && savingsProgressValue && progressBarFill) {
        const goalName = localStorage.getItem("savedGoalName") || "No Goal Set Yet";
        const goalCost = parseInt(localStorage.getItem("savedGoalCost")) || 0;
        const currentSaved = parseInt(localStorage.getItem("totalSavings")) || 0;

        if (goalCost > 0) {
            goalStatusText.innerText = `GROWING YOUR: ${goalName.toUpperCase()} 🌱`;
            savingsProgressValue.innerText = `₹${currentSaved} / ₹${goalCost}`;
            let percentage = (currentSaved / goalCost) * 100;
            if (percentage > 100) percentage = 100;
            if (percentage < 0) percentage = 0;
            progressBarFill.style.width = percentage + "%";
        } else {
            goalStatusText.innerText = "NO WISH SEED PLANTED YET!";
            savingsProgressValue.innerText = "₹0 / ₹0";
            progressBarFill.style.width = "0%";
        }
    }

    // ----------------------------------------------------
    // SYSTEM 3: INTERACTIVE CLOUD GAME ENGINE ARENA RENDER LOGIC
    // ----------------------------------------------------
    const gameGoalTitle = document.getElementById("gameGoalTitle");
    const gameCurrentSaved = document.getElementById("gameCurrentSaved");
    const gameTargetCost = document.getElementById("gameTargetCost");
    const plantStageGraphic = document.getElementById("plantStageGraphic");
    const plantStageLabel = document.getElementById("plantStageLabel");

    if (gameGoalTitle && gameCurrentSaved && gameTargetCost && plantStageGraphic && plantStageLabel) {
        const name = localStorage.getItem("savedGoalName") || "";
        const cost = parseInt(localStorage.getItem("savedGoalCost")) || 0;
        const saved = parseInt(localStorage.getItem("totalSavings")) || 0;

        if (cost > 0) {
            gameGoalTitle.innerText = `SAVING FOR: ${name.toUpperCase()}`;
            gameCurrentSaved.innerText = `₹${saved}`;
            gameTargetCost.innerText = `₹${cost}`;

            let progressPct = (saved / cost) * 100;

            // Visual plant evolution rules mapping based on financial milestones reached
            if (progressPct >= 100) {
                plantStageGraphic.innerText = "🌳";
                plantStageLabel.innerText = "Fully Grown Ancient Tree! 🎉";
            } else if (progressPct >= 75) {
                plantStageGraphic.innerText = "🌿";
                plantStageLabel.innerText = "Lush Leafy Bush Stage";
            } else if (progressPct >= 40) {
                plantStageGraphic.innerText = "🌱";
                plantStageLabel.innerText = "Sprouting Seedling Stage";
            } else if (progressPct >= 10) {
                plantStageGraphic.innerText = "☀️";
                plantStageLabel.innerText = "Seed Cracked Open Stage";
            } else {
                plantStageGraphic.innerText = "🤎";
                plantStageLabel.innerText = "Planted Wish Seed in Soil";
            }
        } else {
            gameGoalTitle.innerText = "NO WISH SEED PLANTED YET!";
            plantStageGraphic.innerText = "🫙";
            plantStageLabel.innerText = "Visit 'Start Journey' to plant a seed!";
        }
    }
});

function plantWishSeed() {
    const itemName = document.getElementById("goalNameInput").value.trim();
    const itemCost = parseInt(document.getElementById("goalAmountInput").value) || 0;

    if (itemName === "" || itemCost <= 0) {
        alert("Please give your item a name and a valid target amount! ✨");
        return;
    }

    localStorage.setItem("savedGoalName", itemName);
    localStorage.setItem("savedGoalCost", itemCost);
    localStorage.setItem("totalSavings", 0);

    alert(`Wish Seed Planted! 🌱 You are now saving up ₹${itemCost} for your "${itemName}".`);
    window.location.href = "game.html";
}

function saveDailyProgress() {
    const earnedVal = parseInt(document.getElementById("earnedInput").value) || 0;
    const spentVal = parseInt(document.getElementById("spentInput").value) || 0;
    const todayNet = earnedVal - spentVal;

    let lifetimeSavings = parseInt(localStorage.getItem("totalSavings")) || 0;
    lifetimeSavings += todayNet;

    localStorage.setItem("totalSavings", lifetimeSavings);
    
    const goalName = localStorage.getItem("savedGoalName") || "your goal";
    const goalCost = parseInt(localStorage.getItem("savedGoalCost")) || 100;
    
    alert(`Day Logged! 🌟 Saved balance total: ₹${lifetimeSavings} / ₹${goalCost} for your ${goalName}.`);
    window.location.href = "index.html";
}
