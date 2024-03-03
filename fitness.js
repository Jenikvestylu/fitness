// Definice pole pro ukládání historie aktivit
let activityHistory = [];

function showActivityHistory() {
    let historyContent = "<h2>Historie aktivit</h2>";
    if (activityHistory.length === 0) {
        historyContent += "<p>Žádné aktivity nebyly zaznamenány.</p>";
    } else {
        historyContent += "<ul>";
        activityHistory.forEach(activity => {
            let dayName;
            switch(activity.day) {
                case 'monday':
                    dayName = 'Pondělí';
                    break;
                case 'tuesday':
                    dayName = 'Úterý';
                    break;
                case 'wednesday':
                    dayName = 'Středa';
                    break;
                case 'thursday':
                    dayName = 'Čtvrtek';
                    break;
                case 'friday':
                    dayName = 'Pátek';
                    break;
                case 'saturday':
                    dayName = 'Sobota';
                    break;
                case 'sunday':
                    dayName = 'Neděle';
                    break;
            }
            let activityName;
            switch(activity.type) {
                case 'running':
                    activityName = 'Běh';
                    break;
                case 'cycling':
                    activityName = 'Jízda na kole';
                    break;
                case 'swimming':
                    activityName = 'Plavání';
                    break;
                case 'strength-training':
                    activityName = 'Posilování';
                    break;
            }
            historyContent += `<li><strong>${dayName} - ${activity.duration} minut</li>`;
        });
        historyContent += "</ul>";
    }

    // Vytvoříme popup okno s historií aktivit
    const popup = window.open("", "Activity History", "width=400,height=400");
    popup.document.body.innerHTML = historyContent;
}

// Funkce pro záznam nové aktivity
function recordActivity() {
  const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

  daysOfWeek.forEach((day, index) => {
    const activitiesInput = document.getElementById(day.toLowerCase() + '-activities');
    const activitiesCount = parseInt(activitiesInput.value);
    const activityType = document.getElementById(day.toLowerCase() + '-activity-type').value;

    // Záznam aktivity do historie pouze pokud byla vykonána
    if (activitiesCount > 0) {
      activityHistory.push({
        day: day,
        type: activityType,
        duration: activitiesCount * 30 // Předpokládáme, že každá aktivita trvá 30 minut
      });
    }
  });
}

// Funkce pro výpočet souhrnu aktivit
function calculateSummary() {
  let totalExercises = 0;
  let totalTime = 0;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  days.forEach(day => {
    const activitiesInput = document.getElementById(day + '-activities');
    const activitiesCount = parseInt(activitiesInput.value);
    totalExercises += activitiesCount;

    if (activitiesCount > 0) {
      const activityType = document.getElementById(day + '-activity-type').value;
      activityHistory.push({
        day: day,
        type: activityType,
        duration: activitiesCount * 30 
      });
    }
  });

  totalTime = totalExercises * 30; 

  document.getElementById('total-exercises').textContent = totalExercises;
  document.getElementById('total-time').textContent = totalTime + ' minuty';
}
