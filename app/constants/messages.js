import Globals from './Globals';

export const messages = {
    addToFavorites: Globals.type === 'es'  ? "Añadido correctamente a tu lista de ver más tarde" : "Successfully added to your watch later",
    removeFromFavorites: Globals.type === 'es'  ? "Eliminado correctamente de tu lista de ver más tarde" : "Successfully removed from the watch later",
    nameEmpty: Globals.type === 'es'  ? "El nombre no puede estar vacío" : "Name cannot be empty.",
    emailEmpty: Globals.type === 'es'  ? "La dirección de correo electrónico no puede estar vacía" : "Email Address cannot be empty.",
    emailNotValid:  Globals.type === 'es'  ? "La dirección de correo electrónico no es válida, ingrese una dirección de correo electrónico adecuada." :  "Email Address is not valid, please enter a proper email address.",
    locationEmpty: Globals.type === 'es'  ? "La ubicación no puede estar vacía." : "Location cannot be empty.",
    interests:  Globals.type === 'es'  ? "Seleccione 3 áreas de interés." : "Select 3 area of interest.",
    profileSaved: Globals.type === 'es'  ? "Detalles de perfil guardados." :  "Profile details saved.",
    profilePic: Globals.type === 'es'  ? "Imagen de perfil guardada." : "Profile picture saved."
};