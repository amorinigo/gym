// NAVBAR AND SHADOW.
const menuButton    = document.getElementById('menuButton');
const menu          = document.getElementById('menu');
const menuItem      = document.getElementById('menuItem');
const menuLinks     = document.getElementsByClassName('menu__link');
const subMenu       = document.getElementById('subMenu');
const subMenuLinks  = document.getElementsByClassName('sub-menu__link');
const shadow        = document.getElementById('shadow');

const closeMenu = () => {
    menu.classList.remove('menu--active');
    menuButton.classList.remove('fa-times');
    shadow.classList.remove('shadow--active');
}

const closeSubMenu = () => {
    subMenu.classList.remove('sub-menu--active');
    menuItem.firstElementChild.firstElementChild.classList.remove('icon--active');
}

const closeNavbar = () => {
    closeMenu();
    closeSubMenu();
}

const toggleMenuView = () => {
    menu.classList.toggle('menu--active');
    menuButton.classList.toggle('fa-times');
    shadow.classList.toggle('shadow--active');
}

const toggleSubMenuView = () => {
    subMenu.classList.toggle('sub-menu--active');
    menuItem.firstElementChild.firstElementChild.classList.toggle('icon--active');
}

menuButton.addEventListener( 'click', () => {
    toggleMenuView();
    closeSubMenu();
});

menuItem.addEventListener( 'click', () => toggleSubMenuView() );
shadow.addEventListener( 'click', () => closeNavbar() );

Array.from( menuLinks ).forEach( 
    menuLink => menuLink.addEventListener( 'click', () => closeNavbar() )
);

Array.from( subMenuLinks ).forEach( 
    subMenuLink => subMenuLink.addEventListener( 'click', () => closeNavbar() )
);



// COUNTDOWN.
const numbers = document.getElementsByClassName( 'clock-number' );
let deadline = new Date().getTime() + 1000000000;

const runCountdown = () => {

    const interval  = setInterval( () => {

        let gap     = deadline - new Date().getTime();
        let hours   = Math.floor( (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) ); 
        let minutes = Math.floor( (gap % (1000 * 60 * 60)) / (1000 * 60) ); 
        let seconds = Math.floor( (gap % (1000 * 60)) / (1000) ); 

        numbers[1].textContent = ( hours   < 10 ) ? `0${hours}`   : hours;
        numbers[2].textContent = ( minutes < 10 ) ? `0${minutes}` : minutes;
        numbers[3].textContent = ( seconds < 10 ) ? `0${seconds}` : seconds;

        if( gap <= 1 ) clearInterval( interval );

    }, 1000 );

}

runCountdown();



// CLASSES SECTION.
const btnMan      = document.getElementById( 'btn1' );
const btnGirls    = document.getElementById( 'btn2' );
const manImages   = document.getElementsByClassName( 'man-img' );
const girlsImages = document.getElementsByClassName( 'girl-img' );

const markBtnMan = ( markMan ) => {
    if( markMan ) {
        btnMan.classList.add('red');
        btnGirls.classList.remove('red');
    } else {
        btnMan.classList.remove('red');
        btnGirls.classList.add('red');
    }
}

const showManImages = ( showMan ) => {
    if( showMan ) {
        markBtnMan( true );
        Array.from( girlsImages ).forEach( image => image.style.display = "none" );
        Array.from( manImages ).forEach( image => image.style.display = "inline-block" );
    } else {
        markBtnMan( false );
        Array.from( girlsImages ).forEach( image => image.style.display = "inline-block" );
        Array.from( manImages ).forEach( image => image.style.display = "none" );
    }
}

btnMan.addEventListener('click', () => showManImages( true ));
btnGirls.addEventListener('click', () => showManImages( false ));



// MODAL VIEW.
const modalShadow  = document.getElementById( 'modalShadow' );
const modal        = document.getElementById( 'modal' );
const modalIcon    = document.getElementById( 'modalIcon' );
const bannerButton = document.getElementById( 'bannerButton' );

const showModal = ( show ) => {
    if( show ) {
        modalShadow.classList.add( 'modal-shadow--active' );
        modal.classList.add( 'modal--active' );
    } else {
        modalShadow.classList.remove( 'modal-shadow--active' );
        modal.classList.remove( 'modal--active' );
        modalForm.reset();
        hideAllErrors( 'modalForm' );
    }
}

bannerButton.addEventListener( 'click', () => showModal( true ));

modalShadow.addEventListener( 'click', e => {
    if (e.target.id !== 'modalShadow') return;
    showModal( false );
});

modalIcon.addEventListener( 'click', () => showModal( false ));



// MODAL AND CONTACT-US FORMS.
const modalForm     = document.getElementById( 'modalForm' );
const contactForm   = document.getElementById( 'contactForm' );

const nameRegex     = /^[a-zA-ZÀ-ÿ]{2,100} ?[a-zA-ZÀ-ÿ]{0,100}$/;
const phoneRegex    = /^[0-9]{8,15}$/;
const messageRegex  = /^.{5,200}$/m;
const emailRegex    = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

modalForm.addEventListener( 'submit', e => evaluateForm( e, modalForm ) );
contactForm.addEventListener( 'submit', e => evaluateForm( e, contactForm ) );



// FUNCTIONS OF THE TWO FORMS.
const evaluateForm = ( event, form ) => {
    event.preventDefault();
    ( isValidForm( form.id ) ) ? sendForm( form ) : showAllErrors( form.id );
}

const isValidForm = formId => {
    let contador = 0;
    inputsOf( formId ).forEach( input => { if ( isValidField(input) ) contador += 1 } );
    return ( contador === inputsOf( formId ).length ) ? true : false;
};

const inputsOf = formId => {
    let inputs = Array.from( document.querySelectorAll( `#${formId} input, #${formId} textarea` ) );
    return inputs.filter( input => !input.defaultValue );
}

const isValidField = input => {
    switch( input.id ) {
        case 'name'    : return nameRegex.test( input.value.trim() );
        case 'phone'   : return phoneRegex.test( input.value );
        case 'name2'   : return nameRegex.test( input.value.trim() );
        case 'email'   : return emailRegex.test( input.value.trim() );
        case 'message' : return messageRegex.test( input.value.trim() );
    }
}

const sendForm = form => {    
    ( form.id == 'modalForm' ) ? showModal(false) : showOkMessage();
    // ON THIS LINE I WOULD SEND THE DATA TO THE BACKEND.
    hideAllErrors( form.id );
    form.reset();
}

const showOkMessage = () => {
    const input = document.querySelector( '#contactForm #success' );
    input.style.display = 'block';
    setTimeout( () => input.style.display = 'none', 3000 );
}

const hideAllErrors = formId => {
    inputsOf( formId ).forEach( input => hideError(input, formId) );
}

const showAllErrors = formId => {
    inputsOf( formId ).forEach(input => !isValidField(input) ? showError(input) : hideError(input));
}

const showError = input => {
    input.style.border = '3px solid red';
    input.nextElementSibling.style.display = 'block';
}

const hideError = ( input, formId ) => {
    ( formId == 'modalForm' ) ? input.style.border = 'none' : input.style.border = '1px solid red';
    input.nextElementSibling.style.display = 'none';
}



// OTHER BUTTONS.
const offerButtons = Array.from( document.getElementsByClassName( 'offer-button' ) );
const buyButtons = Array.from( document.getElementsByClassName( 'pricing-button' ) );
const contactButton = document.getElementById( 'pricingBoxBtn' );

offerButtons.forEach( input => input.addEventListener( 'click', () => showModal(true)) );
buyButtons.forEach( input => input.addEventListener( 'click', () => showModal(true)) );
contactButton.addEventListener( 'click', () => showModal(true) );