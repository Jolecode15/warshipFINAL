document.addEventListener('DOMContentLoaded', () => {
    const width=10;
    const message_container = document.querySelector('.message_container');
    const arrow = document.querySelector('.arrow');
    const message1 = document.querySelector('.message1');
    const message2 = document.querySelector('.message2');
    const footer_container = document.querySelector('.footer');

    class Button{
        constructor(name){
            this.button = document.getElementById(name);
            // console.log(this.button);
        }
    }
    class Maker{
        make_table(current_table, squares){
            // console.log(current_table)
            for(let i=0; i<width*width; i++){
                const one_square=document.createElement('div');
                one_square.dataset.id = i;
                current_table.appendChild(one_square);
                squares.push(one_square);
            }
        }
        
    }
    class Table{
        constructor(name){
            this.table=document.querySelector(name);
            // console.log(this.table);
        }
        squares=[];
    }
    class Ships{
        constructor(){
            this.isHorizontal_global=true;
            this.all_ships=[
                document.querySelector('.destroyer-container'),
                document.querySelector('.submarine-container'),
                document.querySelector('.cruiser-container'),
                document.querySelector('.battleship-container'),
                document.querySelector('.carrier-container')
            ];
            // console.log(this.all_ships);
            this.all_ships_names=[
                'destroyer',
                'submarine',
                'cruiser',
                'battleship',
                'carrier'
            ];
            this.ships_lenghts=[2,3,3,4,5];
    
            this.horizontal_unallowed_fields=[
                [9,19,29,39,49,59,69,79,89,99],
                [8,9,18,19,28,29,38,39,48,49,58,59,68,69,78,79,88,89,98,99],
                [8,9,18,19,28,29,38,39,48,49,58,59,68,69,78,79,88,89,98,99],
                [7,8,9,17,18,19,27,28,29,37,38,39,47,48,49,57,58,59,67,68,69,77,78,79,87,88,89,97,98,99],
                [6,7,8,9,16,17,18,19,26,27,28,29,36,37,38,39,46,47,48,49,56,57,58,59,66,67,68,69,76,77,78,79,86,87,88,89,96,97,98,99]
            ];
            // console.log(this.horizontal_unallowed_fields);
            this.vertical_unallowed_fields=[
                [90,91,92,93,94,95,96,97,98,99],
                [80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
                [80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
                [70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
                [60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]
            ];
            // console.log(this.vertical_unallowed_fields);

            this.my_submerged_fields_destroyer=0;
            this.my_submerged_fields_submarine=0;
            this.my_submerged_fields_cruiser=0;
            this.my_submerged_fields_battleship=0;
            this.my_submerged_fields_carrier=0;

            this.computer_submerged_fields_destroyer=0;
            this.computer_submerged_fields_submarine=0;
            this.computer_submerged_fields_cruiser=0;
            this.computer_submerged_fields_battleship=0;
            this.computer_submerged_fields_carrier=0;

            this.areMyShipsSubmerged=[false,false,false,false,false];
            this.areComputerShipsSubmerged=[false,false,false,false,false];
        }
        my_ships_locations=[
            [],
            [],
            [],
            [],
            []
        ];
        computer_ships_locations=[
            [],
            [],
            [],
            [],
            []
        ];
        areMyShipsSet=[false,false,false,false,false];
        areComputerShipsSet=[false,false,false,false,false];
    
        

        place_ship(current_table,shipIndex){
            let done=false;
            const lenght_of_new_ship=this.ships_lenghts[shipIndex];
            while(done===false){
                // console.log(current_table);
                let isHorizontal_random=Math.floor(Math.random() * 2);
                let field=Math.floor(Math.random() * 100);
                //the location of the new ship is possible,
                //but not determined because checks have not been carried out
                let location_of_new_ship=[];
                let surrounding_fields_location=[];
                if (isHorizontal_random){
                    for (let i=field;i<=field+lenght_of_new_ship-1;i++) location_of_new_ship.push(i);
    
                    let hasLeftField=false, hasRightField=false;
                    if (location_of_new_ship[0]%10>0){
                        //has left field
                        hasLeftField=true;
                        surrounding_fields_location.push(location_of_new_ship[0]-1);
                    }
                    if ((location_of_new_ship[lenght_of_new_ship-1]+1)%10 !== 0){
                        //has right field
                        hasRightField=true;
                        surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]+1);
                    }
                    if (location_of_new_ship[0]>9){
                        //has top row (above ship)
                        for (let i=location_of_new_ship[0]-10;i<=location_of_new_ship[lenght_of_new_ship-1]-10;i++) surrounding_fields_location.push(i);
                        if (hasLeftField){
                            //has top-left field
                            surrounding_fields_location.push(location_of_new_ship[0]-11);
                        }
                        if (hasRightField){
                            //has top-right field
                            surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]-9);
                        }
                    }
                    if (location_of_new_ship[0]<90){
                        //has bottom row (under ship)
                        for (let i=location_of_new_ship[0]+10;i<=location_of_new_ship[lenght_of_new_ship-1]+10;i++) surrounding_fields_location.push(i);
                        if (hasLeftField){
                            //has bottom-left field
                            surrounding_fields_location.push(location_of_new_ship[0]+9);
                        }
                        if (hasRightField){
                            //has bottom-right field
                            surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]+11);
                        }
                    }
                }
                else{
                    for (let i=field;i<=field+10*(lenght_of_new_ship-1);i+=10) location_of_new_ship.push(i);
                    
                    let hasTopField=false, hasBottomField=false;
                    if (location_of_new_ship[0]>9){
                        //has top field
                        hasTopField=true;
                        surrounding_fields_location.push(location_of_new_ship[0]-10);
                    }
                    if (location_of_new_ship[lenght_of_new_ship-1]<90){
                        //has bottom field
                        hasBottomField=true;
                        surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]+10);
                    }
                    if (location_of_new_ship[0]%10 !== 0){
                        //has left column
                        for (let i=location_of_new_ship[0]-1;i<=location_of_new_ship[lenght_of_new_ship-1]-1;i+=10) surrounding_fields_location.push(i);
                        if (hasTopField){
                            //has top-left field
                            surrounding_fields_location.push(location_of_new_ship[0]-11);
                        }
                        if (hasBottomField){
                            //has bottom-left field
                            surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]+9);
                        }
                    }
                    if ((location_of_new_ship[0]+1)%10 !== 0){
                        //has right column
                        for (let i=location_of_new_ship[0]+1;i<=location_of_new_ship[lenght_of_new_ship-1]+1;i+=10) surrounding_fields_location.push(i);
                        if (hasTopField){
                            //has top-right field
                            surrounding_fields_location.push(location_of_new_ship[0]-9);
                        }
                        if (hasBottomField){
                            //has bottom-right field
                            surrounding_fields_location.push(location_of_new_ship[lenght_of_new_ship-1]+11);
                        }
                    }
                }
                let all_location=location_of_new_ship.concat(surrounding_fields_location);
                let all_location_lenght=all_location.length;
                //console.log(location_of_new_ship,surrounding_fields_location);
                //console.log(all_location);
                //console.log(all_location_lenght);
    
                //First check: Can the ship fit in the table?
                let first_check=this.first_check_function(field,isHorizontal_random,shipIndex);
                // console.log(first_check);
    
                // Second check: Whether the first check passed
                // and whether the fields are free from other ships?
                let second_check=this.second_check_function(first_check, current_table, all_location, all_location_lenght, shipIndex);
                // console.log(second_check);
                
                if (first_check && second_check){
                    if (current_table===computer_table_obj.table){
                        location_of_new_ship.forEach((taken_field)=>{
                            computer_table_obj.squares[taken_field].classList.add('taken_div',shipIndex);
                            if(isHorizontal_random){
                                if(location_of_new_ship.indexOf(taken_field)===0){
                                    computer_table_obj.squares[taken_field].classList.add('horizontal-start');
                                }
                                else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                                    computer_table_obj.squares[taken_field].classList.add('horizontal-end');
                                }
                            }
                            else{
                                if(location_of_new_ship.indexOf(taken_field)===0){
                                    computer_table_obj.squares[taken_field].classList.add('vertical-start');
                                }
                                else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                                    computer_table_obj.squares[taken_field].classList.add('vertical-end');
                                }
                            }
                        })
                        all_location.forEach((taken_field)=>{
                            this.computer_ships_locations[shipIndex].push(taken_field);
                        })
                        this.areComputerShipsSet[shipIndex]=true;
                    }
                    else{
                        location_of_new_ship.forEach((taken_field)=>{
                            my_table_obj.squares[taken_field].classList.add('taken_div', 'taken_div_shown', shipIndex);
                            if(isHorizontal_random){
                                if(location_of_new_ship.indexOf(taken_field)===0){
                                    my_table_obj.squares[taken_field].classList.add('horizontal-start');
                                }
                                else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                                    my_table_obj.squares[taken_field].classList.add('horizontal-end');
                                }
                            }
                            else{
                                if(location_of_new_ship.indexOf(taken_field)===0){
                                    my_table_obj.squares[taken_field].classList.add('vertical-start');
                                }
                                else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                                    my_table_obj.squares[taken_field].classList.add('vertical-end');
                                }
                            }
                        })
                        all_location.forEach((taken_field)=>{
                            this.my_ships_locations[shipIndex].push(taken_field);
                        })
                        this.areMyShipsSet[shipIndex]=true;
                    }
                    done=true;
                }
            }
        }
        first_check_function(field,isHorizontal,shipIndex){
            //First check: Can the ship fit in the table?
            if (isHorizontal){
                if (this.horizontal_unallowed_fields[shipIndex].indexOf(field)===-1){
                    return true;
                }
                else return false;
            }
            else{
                if (this.vertical_unallowed_fields[shipIndex].indexOf(field)===-1){
                    return true;
                }
                else return false;
            }
        }
        second_check_function(first_check, current_table, all_location, all_location_lenght ,shipIndex){
            // Second check: Whether the first check passed
            // and whether the fields are free from other ships?
            if (first_check){
                //j = lenght of all_location array - 1 (index of last field of new ship)
                let i=4;
                let j;
                if (current_table===computer_table_obj.table){
                    while(i>shipIndex){
                        j=all_location_lenght-1;
                        while(j>=0){
                            if (this.computer_ships_locations[i].indexOf(all_location[j])!==-1){
                                return false;
                            }
                            j--;
                        }
                        i--;
                    }
                }
                else{
                    while(i>shipIndex){
                        j=all_location_lenght-1;
                        while(j>=0){
                            if (this.my_ships_locations[i].indexOf(all_location[j])!==-1){
                                return false;
                            }
                            j--;
                        }
                        i--;
                    }
                }
                return true;
            }
            else return false;
        }
        remove_ships_from_middle_container(){
            this.all_ships.forEach((ship)=>{
                ship.style.display='none';
            })
        }
        remove_my_ship_from_table(shipIndex){
            this.my_ships_locations[shipIndex]=[];
            my_table_obj.squares.forEach((field)=>{
                field.classList.remove('taken_div', 'taken_div_shown',shipIndex,'horizontal-start','horizontal-end','vertical-start','vertical-end');
            });
        }
        check_ships_function(){
            if (this.areMyShipsSet.length===5 && this.areComputerShipsSet.length===5){
                if (this.areMyShipsSet.indexOf(false)===-1){
                        if (this.areComputerShipsSet.indexOf(false)===-1){
                            return true;
                        }                 
                }
            }
            return false;
        }
        //attributes and functions for playing
        selectedShipNameWithIndex;
        draggedShip;
        draggedShipLength;
    
        dragStart(){
            //console.log('dragstart');
            ships.draggedShip = this;
            ships.draggedShipLength = this.childNodes.length;
            //console.log(this.draggedShip, this.draggedShipLength);
        }
        dragOver(e){
            //console.log('dragover');
            e.preventDefault();
        }
        dragEnter(e){
            //console.log('dragenter');
            e.preventDefault();
        }
        dragLeave(){
            //console.log('dragleave');
        }
        dragDrop(){
            //console.log('dragdrop');
            
            //To be places, dragged ship must pass first and second check
            //through samename functions/methods of 'ships' objects?
            let shipName = ships.selectedShipNameWithIndex.slice(0,-2);
            let shipIndex = ships.all_ships_names.indexOf(shipName);
            let selectedFieldIndex=ships.selectedShipNameWithIndex.slice(-1);
            //console.log(shipIndex);
    
            //let first_check=ships.first_check_function(this.dataset.id-ships.draggedShipLength, ships.isHorizontal_global, shipIndex);
            //let second_check=ships.second_check_function(first_check,)//OVDE nastavi
            //ako zelis provjeriti da li je polje zauzeto od strane drugog broda
    
            //Placing the dragged ship
            let first_field_location;
            let last_field_location;
            let location_of_new_ship=[];
            if (ships.isHorizontal_global){
                first_field_location=this.dataset.id-selectedFieldIndex;
                last_field_location=first_field_location+ships.draggedShipLength-1;
                //console.log(first_field_location, last_field_location);
                for (let i=first_field_location;i<=last_field_location;i++) location_of_new_ship.push(i);
            }
            else{
                first_field_location=this.dataset.id-10*selectedFieldIndex;
                last_field_location=first_field_location+10*ships.draggedShipLength-10;
                //console.log(first_field_location, last_field_location);
                for (let i=first_field_location;i<=last_field_location;i+=10) location_of_new_ship.push(i);
            }
            location_of_new_ship.forEach((taken_field)=>{
                my_table_obj.squares[taken_field].classList.add('taken_div','taken_div_shown',shipIndex);
                if(ships.isHorizontal_global){
                    if(location_of_new_ship.indexOf(taken_field)===0){
                        my_table_obj.squares[taken_field].classList.add('horizontal-start');
                    }
                    else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                        my_table_obj.squares[taken_field].classList.add('horizontal-end');
                    }
                }
                else{
                    if(location_of_new_ship.indexOf(taken_field)===0){
                        my_table_obj.squares[taken_field].classList.add('vertical-start');
                    }
                    else if(location_of_new_ship.indexOf(taken_field)===location_of_new_ship.length-1){
                        my_table_obj.squares[taken_field].classList.add('vertical-end');
                    }
                }
            })
            ships.draggedShip.style.display = 'none';
            ships.areMyShipsSet[shipIndex]=true;
        }
        dragEnd(){
            //console.log('dragend');
        }
}

function reveal_square(who_play,squareForReveal,squareClassList){
    // console.log(who_play,squareForReveal,squareClassList);
    let squareclassList_array=Object.values(squareClassList);
    let ship_found=false;
    if (who_play === 'comp'){
        //Computer play
        if(squareclassList_array.includes('taken_div'))
        {
            ship_found=true;
            console.log('HIT');
            squareForReveal.classList.add('hit');

            //Adding 1 to counter which indicates how many fields of certain ship are submerged (if it was not added already)
            if (!squareclassList_array.includes('checked')){
                if(squareclassList_array.includes('0')){
                    ships.my_submerged_fields_destroyer++;
                    console.log('my destroyer ++')
                }
                else if(squareclassList_array.includes('1')){
                    ships.my_submerged_fields_submarine++;
                    console.log('my submarine ++')
                }
                else if(squareclassList_array.includes('2')){
                    ships.my_submerged_fields_cruiser++;
                    console.log('my cruiser ++')
                }
                else if(squareclassList_array.includes('3')){
                    ships.my_submerged_fields_battleship++;
                    console.log('my battleship ++')
                }
                else if(squareclassList_array.includes('4')){
                    ships.my_submerged_fields_carrier++;
                    console.log('my carrier ++')
                }
            }
            //Checking if some of my ships are submerged
            if(ships.my_submerged_fields_destroyer===2 && !ships.areMyShipsSubmerged[0]){
                ships.areMyShipsSubmerged[0]=true;
                console.log('MY destroyer submerged: ', true)
                message2.innerHTML = 'The computer sank your destroyer!'
            }
            if(ships.my_submerged_fields_submarine===3 && !ships.areMyShipsSubmerged[1]){
                ships.areMyShipsSubmerged[1]=true;
                console.log('MY submarine submerged: ', true)
                message2.innerHTML = 'The computer sank your submarine!'
            }
            if(ships.my_submerged_fields_cruiser===3 && !ships.areMyShipsSubmerged[2]){
                ships.areMyShipsSubmerged[2]=true;
                console.log('MY cruiser submerged: ', true)
                message2.innerHTML = 'The computer sank your cruiser!'
            }
            if(ships.my_submerged_fields_battleship===4 && !ships.ships.areMyShipsSubmerged[3]){
                ships.areMyShipsSubmerged[3]=true;
                console.log('MY battleship submerged: ', true)
                message2.innerHTML = 'The computer sank your battleship!'
            }
            if(ships.my_submerged_fields_carrier===5 && !ships.areMyShipsSubmerged[4]){
                ships.areMyShipsSubmerged[4]=true;
                console.log('MY carrier submerged: ', true)
                message2.innerHTML = 'The computer sank your carrier!'
            }

            //Setting gameOver variable true if all my or computer ships are submerged
            if(ships.areMyShipsSubmerged.indexOf(false)===-1){
                gameOver=true;
                message2.innerHTML = 'COMPUTER WON. DO NOT GIVE UP !!!';
            }

            squareForReveal.classList.add('checked');
        }
    }
    else{
        //I play
        if(squareclassList_array.includes('taken_div'))
        {
            ship_found=true;
            console.log('HIT');
            squareForReveal.classList.add('hit');
            
            //Adding 1 to counter which indicates how many fields of certain ship are submerged (if it was not added already)
            if(!squareclassList_array.includes('checked')){
                if(squareclassList_array.includes('0')){
                    ships.computer_submerged_fields_destroyer++;
                    console.log('comp destroyer ++')
                }
                else if(squareclassList_array.includes('1')){
                    ships.computer_submerged_fields_submarine++;
                    console.log('comp submarine ++')
                }
                else if(squareclassList_array.includes('2')){
                    ships.computer_submerged_fields_cruiser++;
                    console.log('comp cruiser ++')
                }
                else if(squareclassList_array.includes('3')){
                    ships.computer_submerged_fields_battleship++;
                    console.log('comp battleship ++')
                }
                else if(squareclassList_array.includes('4')){
                    ships.computer_submerged_fields_carrier++;
                    console.log('comp carrier ++')
                }
            }
            //Checking if some of my ships are submerged
            if(ships.computer_submerged_fields_destroyer===2 && !ships.areComputerShipsSubmerged[0]){
                ships.areComputerShipsSubmerged[0]=true;
                console.log('COMP destroyer submerged: ', true)
                message2.innerHTML = "You sank computer's destroyer!"
            }
            if(ships.computer_submerged_fields_submarine===3 && !ships.areComputerShipsSubmerged[1]){
                ships.areComputerShipsSubmerged[1]=true;
                console.log('COMP submarine submerged: ', true)
                message2.innerHTML = "You sank computer's submarine!"
            }
            if(ships.computer_submerged_fields_cruiser===3 && !ships.areComputerShipsSubmerged[2]){
                ships.areComputerShipsSubmerged[2]=true;
                console.log('COMP cruiser submerged: ', true)
                message2.innerHTML = "You sank computer's cruiser!"
            }
            if(ships.computer_submerged_fields_battleship===4 && !ships.areComputerShipsSubmerged[3]){
                ships.areComputerShipsSubmerged[3]=true;
                console.log('COMP battleship submerged: ', true)
                message2.innerHTML = "You sank computer's battleship!"
            }
            if(ships.computer_submerged_fields_carrier===5 && !ships.areComputerShipsSubmerged[4]){
                ships.areComputerShipsSubmerged[4]=true;
                console.log('COMP carrier submerged: ', true)
                message2.innerHTML = "You sank computer's carrier!"
            }

            //Setting gameOver variable true if all my or computer ships are submerged
            if(ships.areComputerShipsSubmerged.indexOf(false)===-1){
                gameOver=true;
                message2.innerHTML = 'YOU WON. CONGRATULATIONS !!!';
            }

            squareForReveal.classList.add('checked');
        }
    }
    if(!ship_found){
        console.log('MISS');
        squareForReveal.classList.add('miss');
    }
    
    isMyTurn = !isMyTurn;
    
}
function gameOver_function(){
    arrow.style.display = 'none';
    message1.innerHTML = 'GAME OVER';
}
let my_response=-1;
function play_function(){
    console.log('hello');
    if (!gameOver){
        if (isMyTurn){
            //MY TURN
            console.log('I play');

            if(my_response!==-1){
                reveal_square('me',my_response,my_response.classList);
                my_response=-1;

                //Prepare message1 and arrow for next turn after exiting the function reveal_square()
                message1.innerHTML = 'Computer turn';
                //ADD ANIMATION FOR ARROW
                arrow.style.animation = "rotate_arrow_to_computer 0.5s 1 forwards";
            }
        }
        else{
            //COMPUTER's TURN
            console.log('Computer play');

            //Computer starts its hitting
            let random_squareID = Math.floor(Math.random() * 100);
            let square = my_table_obj.squares[random_squareID];
            reveal_square('comp', square, square.classList);

            //Prepare message and arrow for next turn after exiting the function reveal_square()
            message1.innerHTML = 'Your turn';
            //ADD ANIMATION FOR ARROW
            arrow.style.animation = "rotate_arrow_to_me 0.5s 1 backwards reverse";

        }
    }
    else{
        //gameOver();
        clearInterval(repeater);
        //console.log('GAME OVER');
        gameOver_function();
    }
}

//Making objects for my and computer's tables and maker,
//then making my and computer's table/grid with maker_obj object
const my_table_obj = new Table('.table_me');
const computer_table_obj = new Table('.table_enemy');
const maker_obj = new Maker();

maker_obj.make_table(my_table_obj.table, my_table_obj.squares);
maker_obj.make_table(computer_table_obj.table, computer_table_obj.squares);

//Making objects for ships and storing all ships in one array
const ships = new Ships();

//Placing computer's ships

ships.place_ship(computer_table_obj.table,4);
ships.place_ship(computer_table_obj.table,3);
ships.place_ship(computer_table_obj.table,2);
ships.place_ship(computer_table_obj.table,1);
ships.place_ship(computer_table_obj.table,0);


console.log("4",ships.computer_ships_locations[4]);
console.log("3",ships.computer_ships_locations[3]);
console.log("2",ships.computer_ships_locations[2]);
console.log("1",ships.computer_ships_locations[1]);
console.log("0",ships.computer_ships_locations[0]);


//Making objects for buttons (play,shuffle,rotate) and giving them functionality
const play_button = new Button('play');
const shuffle_button = new Button('shuffle');
const rotate_button = new Button('rotate');

shuffle_button.button.addEventListener('click', ()=>{
    ships.remove_ships_from_middle_container();
    
    ships.remove_my_ship_from_table(4);
    ships.remove_my_ship_from_table(3);
    ships.remove_my_ship_from_table(2);
    ships.remove_my_ship_from_table(1);
    ships.remove_my_ship_from_table(0);
    ships.areMyShipsSet=[];

    rotate_button.button.style.display='none';

    ships.place_ship(my_table_obj.table,4);
    ships.place_ship(my_table_obj.table,3);
    ships.place_ship(my_table_obj.table,2);
    ships.place_ship(my_table_obj.table,1);
    ships.place_ship(my_table_obj.table,0);

})

rotate_button.button.addEventListener('click', ()=>{
    ships.all_ships[0].classList.toggle('destroyer-container-vertical');
    ships.all_ships[1].classList.toggle('submarine-container-vertical');
    ships.all_ships[2].classList.toggle('cruiser-container-vertical');
    ships.all_ships[3].classList.toggle('battleship-container-vertical');
    ships.all_ships[4].classList.toggle('carrier-container-vertical');
    ships.isHorizontal_global=!ships.isHorizontal_global;
    //console.log(ships.isHorizontal_global);
})

// Giving the player the ability to place the ships of his choice
ships.all_ships.forEach(ship => ship.addEventListener('dragstart', ships.dragStart));
my_table_obj.squares.forEach(square => square.addEventListener('dragstart', ships.dragStart));
my_table_obj.squares.forEach(square => square.addEventListener('dragover', ships.dragOver));
my_table_obj.squares.forEach(square => square.addEventListener('dragenter', ships.dragEnter));
my_table_obj.squares.forEach(square => square.addEventListener('dragleave', ships.dragLeave));
my_table_obj.squares.forEach(square => square.addEventListener('drop', ships.dragDrop));
my_table_obj.squares.forEach(square => square.addEventListener('dragend', ships.dragEnd));

ships.all_ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    ships.selectedShipNameWithIndex = e.target.classList.value;
    //console.log(ships.selectedShipNameWithIndex);
}))

// Checking if all ships on my and computer table are placed
// and if true game can start, and play button can get its function

let isMyTurn;
let repeater;
let gameOver = false;
play_button.button.addEventListener('click', ()=>{
    if (ships.check_ships_function()){
        //At this point, game can start; SINGLEPLAYER
        //Placing arrow and message which will indicate whose turn it is
        message_container.style.display = 'block';
        
        //Removing all buttons from display
        footer_container.style.display = 'none';

        //Setting first turn as mine and starting play function
        isMyTurn=true;
        //Setting arrow and message text
        message1.innerHTML = 'Your turn';
        //ADD ANIMATION FOR ARROW

        //Adding possibility to player to hit computer's ships
        computer_table_obj.squares.forEach(square => square.addEventListener('click',()=>{
            my_response=square;
        }));
        //Setting continuously executing the function for playing game
        repeater = setInterval(play_function,2000);
    }
    else alert('GRESKA. NISU SVI BRODOVI POSTAVLJENI');
})

})