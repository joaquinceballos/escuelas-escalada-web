import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    es: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
            },

            idioma: {
                codigo: 'es'
            },

            formulario: {
                campo_obligatorio: 'Campo obligatorio',
                longitud_maxima: 'Máximo permitido: {0}',
            },

            login: {
                header: 'Escuelas de Escalada - Identifícate',
                username: 'Nombre de usuario / email',
                password: 'Contraseña',
                entrar: 'Entrar',
                registrar: '¿No tienes cuenta? Click aquí para registrarte',
                obligatorio: 'Campo obligatorio',
                bienvenido: 'Bienvenido!',
                ko: {
                    header: 'Error',
                    texto: 'No se ha podido acceder con el usuario y contraseña introducidos'
                }
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
                },
                escuela: {
                    titulo: 'Crear nueva escuela',
                    nombre: 'Nombre de Escuela',
                    informacion: 'información',
                    zona: 'Zona de escalada',
                    pais: 'país',
                    region: 'región',
                    creada: 'Escuela creada con éxito',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear la nueva escuela con los datos introducidos'
                    }
                },
                sector: {
                    titulo: 'Crear nuevo Sector',
                    nombre: 'Nombre',
                    informacion: 'Información',
                    creado: 'Sector creado con éxito',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear el nuevo sector con los datos introducidos'
                    }
                }
            },

            paginacion: {
                previo: 'previo',
                siguiente: 'siguiente',
                de: 'de'
            },

            navbar: {
                inicio: "Inicio",
                zonas: 'Zonas',
                admin: 'Administración',
                busqueda: {
                    placeholder: 'Buscar'
                },
                usuario: {
                    perfil: 'Perfil',
                    logout: 'logout',
                    login: 'login'
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

            zona: {
                titulo: 'Zonas de escalada',
                filtropais: {
                    texto: 'Seleccione país'
                },
                tabla: {
                    region: 'región',
                    pais: 'país',
                    nescuelas: '#Escuelas',
                    nvias: '#Vías'
                },
                anadir_escuela: 'Añadir escuela',
                listado_escuelas: 'Listado de escuelas'
            },

            escuela: {
                tabla: {
                    nombre: 'Nombre',
                    pais: 'País',
                    nsectores: '#Sectores',
                    nvias: '#Vías'
                },

                detalle: {
                    sectores: "Sectores de la escuela",
                    anadir_sector: 'Añadir sector',
                    cierresTemporada: {
                        titulo: "Cirres de temporada",
                        texto: "Esta escuela está regulada con cierres temporales para proteger la de cría de aves. Para conocer las fechas afectadas despliegue el calendario",
                        botoninfo: "Más información",
                        tipo: {
                            CRIA_AVES: {
                                texto: "Cría estacional de aves nidificantes"
                            }
                        }
                    }

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
            }
        }
    },
    en: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
            },

            idioma: {
                codigo: 'en'
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
                    logout: 'logout',
                    login: 'login'
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