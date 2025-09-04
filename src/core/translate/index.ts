import { I18n } from "aws-amplify/utils";
import { confirmScreen } from "@/auth/translate/confirmScreen";
import { signInScreen } from "@/auth/translate/signInScreen";
import { signUpScreen } from "@/auth/translate/signUpScreen";
import { welcomeScreen } from "@/auth/translate/welcomeScreen";
// import {publicationTranslate} from '@/publications/translate/publication';
// import {completeAccount} from '@/users/translate/completeAccount';

const dict = {
  en: {
    ...welcomeScreen.en,
    ...signInScreen.en,
    ...signUpScreen.en,
    ...confirmScreen.en,

    // User
    // ...completeAccount.en,

    // General
    "app.modal.media.title": "Open with",
    "app.modal.media.btn.gallery": "Gallery",
    "app.modal.media.btn.camera": "Camera",
    "app.show.empty.list": "Not found",
    "app.list.empty": "List empty",
    "app.name": "Buscaninos",
  },
  es: {
    ...welcomeScreen.es,
    ...signInScreen.es,
    ...signUpScreen.es,
    ...confirmScreen.es,

    // User
    // ...completeAccount.es,

    // General
    "app.modal.media.title": "Abrir con",
    "app.modal.media.btn.gallery": "Galería",
    "app.modal.media.btn.camera": "Cámara",
    "app.show.empty.list": "No hay datos",
    "app.list.empty": "Lista vacia",
    "app.name": "Buscaninos",
  },
};

I18n.putVocabularies(dict);
