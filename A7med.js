document.getElementById('srch').addEventListener('click', function() {
            
            const inputElement = document.getElementById('srch2');
            let searchTerm = inputElement.value.trim().toLowerCase();  
            let targetURL = '';

            switch (searchTerm) {
                case 'sakamoto days':
                    targetURL = '/anime1/Sakamoto Days.html'; 
                    break;
                    
                    case 'solo leveling':
                        targetURL = '/anime2/solo leveling.html';
                        break;

                case 'hunter x hunter':
                    targetURL = '/anime3/hunter x hunter.html';
                    break;

                    case 'demon slayer':
                    targetURL = '/anime4/demon slayer.html';
                    break;

                    case 'black clover':
                    targetURL = '/anime5/Black Clover.html';
                    break;

                    case 'attack on titan':
                    targetURL = '/anime6/Attack_on_Titan.html';
                    break;
                    
                default:
                    if (searchTerm === "") {
                        alert("enter your anime!");
                        return;
                    }
                    
                    const encodedSearchTerm = encodeURIComponent(searchTerm);
                    targetURL =`https://www.google.com/search?q=${encodedSearchTerm}`;
                    break;
            }

            if (targetURL) {
                window.location.href = targetURL;
            }
        });
       