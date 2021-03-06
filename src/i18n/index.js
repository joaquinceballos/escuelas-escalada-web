import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    es: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
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
            }
        }
    },
    en: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada'
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

const i18n = new VueI18n({
    locale: 'es',
    messages,
});

export default i18n;