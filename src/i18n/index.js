import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    es: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
            },

            login: {
                header: 'Escuelas de Escalada - Identifícate',
                username: 'Nombre de usuario / email',
                password: 'Contraseña',
                entrar: 'Entrar',
                registrar: '¿No tienes cuenta? Click aquí para registrarte'
            },

            register: {
                header: 'Escuelas de Escalada - Regístrate',
                username: 'Nombre de usuario',
                nombre: 'Nombre',
                apellido1: 'Apellido 1',
                apellido2: 'Apellido 2',
                email: 'Email',
                password: 'Contraseña',
                submit: 'Registrar',
                login: '¿Ya tienes cuenta? Click aquí para entrar'
            },

            modal: {
                error: 'Error',
                registrado: {
                    titulo: 'Usuario registrado',
                    texto: 'Nuevo usuario creado correctamente, por favor haga login'
                }
            },

            paginacion: {
                previo: 'previo',
                siguiente: 'siguiente',
                de: 'de'
            },

            navbar: {
                busqueda: {
                    placeholder: 'Buscar'
                },
                usuario: {
                    perfil: 'Perfil',
                    logout: 'logout'
                }
            },

            resultados: {
                escuelas: {
                    titulo: 'Escuelas'
                },
                sectores: {
                    titulo: 'Sectores'
                },
                vias: {
                    titulo: 'Vías'
                }
            },

            perfil: {
                titulo: 'Datos del usuario',
                username: 'Nombre de usuario',
                email: 'Email',
                nombre: 'Nombre',
                apellido1: 'Apellido 1',
                apellido2: 'Apellido 2',
                pais: 'País',
                nacimiento: 'Fecha de nacimiento'
            },

            escuela: {
                tabla: {
                    nombre: 'Nombre',
                    pais: 'País',
                    nsectores: '#Sectores',
                    nvias: '#Vías'
                }
            },

            sector: {
                tabla: {
                    nombre: 'Nombre',
                    escuela: 'Escuela',
                    nvias: '#Vías'
                }
            },

            via: {
                tabla: {
                    nombre: 'Nombre',
                    escuela: 'Escuela',
                    grado: 'Grado',
                    longitud: 'Longitud'
                }
            },

            detalle: {
                escuela: {
                    sectores: "Sectores de la escuela"
                }
            }
        }
    },
    en: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
            },

            login: {
                header: 'Escuelas de Escalada - Log in',
                username: 'Username / email',
                password: 'Password',
                entrar: 'Enter',
                registrar: 'Not a member yet? Click to register'
            },

            modal: {
                error: 'Error',
                registrado: {
                    titulo: 'User registered',
                    texto: 'New user has been created, please login'
                }
            },

            register: {
                header: 'Escuelas de Escalada - Sign in',
                username: 'Username',
                nombre: 'Name',
                apellido1: 'Surname',
                apellido2: 'Mother name',
                email: 'Email',
                password: 'Password',
                submit: 'Sign in',
                login: 'already a member? Click here to log in'
            },

            paginacion: {
                previo: 'previous',
                siguiente: 'next',
                de: 'of'
            },

            navbar: {
                busqueda: {
                    placeholder: 'Search'
                },
                usuario: {
                    perfil: 'Profile',
                    logout: 'logout'
                }
            },

            resultados: {
                escuelas: {
                    titulo: 'iEscuelas'
                },
                sectores: {
                    titulo: 'iSectores'
                },
                vias: {
                    titulo: 'iVías'
                }
            },

            perfil: {
                titulo: 'User details',
                username: 'Username',
                email: 'Email',
                nombre: 'Name',
                apellido1: 'Surname',
                apellido2: 'Mother name',
                pais: 'Country',
                nacimiento: 'Birthday'
            },

            escuela: {
                tabla: {
                    nombre: 'Name',
                    pais: 'Country',
                    nsectores: '#iSectores',
                    nvias: '#iVías'
                }
            },

            sector: {
                tabla: {
                    nombre: 'Name',
                    escuela: 'iEscuela',
                    nvias: '#iVías'
                }
            },

            via: {
                tabla: {
                    nombre: 'Name',
                    escuela: 'iEscuela',
                    grado: 'Degree',
                    longitud: 'Length'
                }
            }
        }
    }
};

let lang;
if (localStorage.getItem("web-escuelas-idioma")) {
    lang = localStorage.getItem("web-escuelas-idioma");
} else {
    lang = 'es';
}

const i18n = new VueI18n({
    locale: lang,
    messages,
});

export default i18n;