import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    es: {
        message: {

            app: {
                nombre: 'Escuelas de Escalada',
                zona: 'ha creado una nueva zona de escalada en',
            },

            idioma: {
                codigo: 'es'
            },

            formulario: {
                campo_obligatorio: 'Campo obligatorio',
                longitud_maxima: 'Máximo permitido: {0}',
            },

            home: {
                alert: {
                    token: 'Se ha caducado la sesión'
                }
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
                },
                texto_registrar: '¿No tienes cuenta?',
                texto_registrar_link: 'Créate una'
            },

            register: {
                header: 'Escuelas de Escalada - Regístrate',
                username: 'Nombre de usuario',
                nombre: 'Nombre',
                apellido1: 'Apellido 1',
                apellido2: 'Apellido 2',
                apellido: 'Apellido',
                email: 'Email',
                password: 'Contraseña',
                submit: 'Registrar',
                texto_login: '¿Ya tienes cuenta?',
                texto_login_link: 'Identificate',
                pais: 'País',
                obligatorio: 'Campo obligatorio',
                error: {
                    header: 'Error',
                    texto: 'No se puedo crear el nuevo usuario: {msg}'
                }
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
                    actualizada: 'Escuela actualizada correctamente',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear la nueva escuela: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirmar borrado de escuela',
                        texto: 'Se borrará la escuela "{nombre}" junto con todos sus sectores permanentemente'
                    }
                },
                sector: {
                    titulo: 'Crear nuevo Sector',
                    nombre: 'Nombre',
                    informacion: 'Información',
                    creado: 'Sector creado con éxito',
                    actualizado: 'Sector actualizado correctamente',
                    posicion: 'Posición',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear el nuevo sector: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirmar borrado de sector',
                        texto: 'Se borrará el sector "{nombre}" junto con sus vías y croquis permanentemente'
                    },
                    horas_de_sol: 'Horas de sol',
                    inicio: 'Inicio',
                    fin: 'Fin'
                },
                via: {
                    titulo_nueva: 'Crear nueva vía',
                    titulo_actualizar: 'Actualizar datos vía',
                    nombre: 'Nombre',
                    grado: 'Grado',
                    longitud: 'Longitud',
                    numero_chapas: 'Número de chapas',
                    informacion: 'Información',
                    validacion: {
                        longitud: 'Mayor que 0 y múltiplo de 0,25',
                        numero_chapas: 'Número no válido'
                    },
                    anadir_a_croquis: {
                        titulo: 'Añadir vía',
                        texto1: 'Selecciona la vía del sector que quieras añadir al croquis',
                        texto2: '¿No encuentras la vía? ',
                        texto_link: 'Créala nueva'
                    },
                    creada: 'Vía creada correctamente',
                    actualizada: 'Vía actualizada correctamente',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear la nueva vía: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirmar borrado de vía',
                        texto: 'Se borrará la vía {nombre} permanentemente'
                    }
                },
                croquis: {
                    titulo: 'Añadir nuevo croquis',
                    nombre: 'Nombre',
                    imagen: 'Imagen',
                    browse_text: 'Examinar',
                    placeholder: 'Escoje o arrastra imagen...',
                    drop_placeholder: 'Suelta la imagen aquí',
                    error: {
                        imagen: 'Imagen no es válida',
                        header: 'Error',
                        texto: 'No se puede cargar el croquis: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirmar borrado de croquis',
                        texto: 'Se borrará el croquis incluyendo la imágen y los trazos de vía dibujados sobre el mismo.'
                    }
                },
                ascension: {
                    header: 'Nueva ascensión',
                    fecha: 'Fecha',
                    grado: 'Grado',
                    comentario: 'Comentario',
                    registrada: 'Ascensión egistrada!',
                    ko: {
                        header: 'Error',
                        texto: 'Error registrando ascensión {msg}'
                    }

                },
                cierres: {
                    titulo: 'Nuevo cierre de temporada',
                    inicio: 'Inicio',
                    fin: 'Fin',
                    motivo: 'Motivo',
                    obligatorio: 'Campo obligatorio',
                    rango: 'Rango de fechas no válido',
                    combo: {
                        CRIA_AVES: 'Cría de aves',
                        OTROS: 'Otros'
                    },
                    borrar: {
                        titulo: 'Confirmar borrado cierre de temporada',
                        texto: '¿Borrar el cierre te temporada por motivo "{motivo}" del {inicio} al {fin}?'
                    },
                    error: {
                        header: 'Error',
                        texto: 'Error registrado el cierre de temporada: {msg}'
                    }
                },
                zona: {
                    titulo_nueva: 'Crear nueva zona',
                    titulo_actualizar: 'Actualizar zona',
                    pais: 'País',
                    visible: 'Visible',
                    region: 'Región',
                    url_imagen: 'URL imagen',
                    informacion: 'información',
                    borrar: {
                        titulo: 'Confirmar borrado de zona',
                        texto: 'Se borrará la zona "{nombre}"'
                    },
                    error: {
                        grabando: {
                            header: 'Error',
                            texto: 'No se puede grabar la zona: {msg}'
                        },
                        actualizando: {
                            header: 'Error',
                            texto: 'No se puede actualizar la zona: {msg}'
                        },
                        borrando: {
                            header: 'Error',
                            texto: 'No se puede borrar la zona: {msg}'
                        }
                    },
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
                listado_escuelas: 'Listado de escuelas',
                filtro: {
                    escuelas_si: 'Mostrar todas',
                    escuelas_no: 'Mostrar con escuelas'
                },
                detalle: {
                    zona: {
                        ficha: 'ficha',
                        pais: 'País',
                        numero_escuelas: 'Número de escuelas',
                        visible: {
                            texto: 'Visible',
                            si: 'Sí',
                            no: 'No'
                        },
                        editar: 'Modificar zona'
                    }
                }
            },

            zonas: {
                anadir_zona: 'Añadir zona'
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
                        titulo: "Cierres de temporada",
                        texto: "Esta escuela está regulada con cierres temporales para proteger la de cría de aves. Para conocer las fechas afectadas despliegue el calendario",
                        botoninfo: "Más información",
                        tipo: {
                            CRIA_AVES: {
                                texto: "Cría estacional de aves nidificantes"
                            },
                            OTROS: {
                                texto: "Otros motivos no especificados"
                            }
                        },
                        anadir: 'Añadir cierre de temporada',
                        motivo: {
                            CRIA_AVES: "Cría estacional de aves nidificantes",
                            OTROS: 'Otros motivos'
                        },
                        inicio: 'inicio',
                        fin: 'fin'
                    },
                    escuela: {
                        ficha: 'Ficha',
                        zona: 'Zona',
                        numero_sectores: 'Número de sectores',
                        editar: 'Modificar escuela'
                    }

                }
            },

            sector: {
                tabla: {
                    nombre: 'Nombre',
                    escuela: 'Escuela',
                    nvias: '#Vías'
                },
                detalle: {
                    listado_vias: 'Vías',
                    listado_croquis: 'Croquis',
                    anadir_via: 'Añadir vía',
                    tooltip_croquis: 'Añade nuevo croquis',
                    ascensiones: {
                        titulo: 'Ascensiones',
                        anadir: 'Añade tu ascensión'
                    },
                    via: {
                        longitud: 'Longitud',
                        numeroChapas: 'Número de chapas',
                        grado: 'Grado',
                        informacion: 'Información',
                        editar: 'Modificar datos de vía',
                        ficha: 'Ficha',
                        metros: 'metros'
                    },
                    sector: {
                        editar: 'Modificar sector',
                        ficha: 'Ficha',
                        escuela: 'Escuela',
                        nombre: 'Nombre',
                        numero_vias: 'Número de vías',
                        informacion: 'Información',
                        ubicacion: 'Ubicación',
                        latitud: 'latitud',
                        longitud: 'longitud',
                        horas_de_sol: {
                            titulo: 'Horas de sol',
                            texto: 'Horas aproximadas en que el sol incide con más fuerza',
                            inicio: 'inicio',
                            fin: 'fin',
                            sin_info: 'Sin información registrada de horas de sol'
                        }
                    }
                }
            },

            via: {
                tabla: {
                    nombre: 'Nombre',
                    escuela: 'Escuela',
                    grado: 'Grado',
                    longitud: 'Longitud',
                    numero_chapas: '#Chapas'
                }
            },

            croquis: {
                context_menu: {
                    borrar_punto: "borrar punto"
                },
                toolbar: {
                    croquis: 'Croquis',
                    guardar_cambios: "Guardar cambios",
                    exportar: 'Exportar',
                    salir: 'Salir',
                    edicion: 'Edición',
                    recargar: 'Recargar',
                    formato: 'Formato',
                    leyenda: 'Leyenda',
                    tipo: 'Tipo',
                    caja: 'Caja',
                    barra: 'Barra',
                    via: 'Vía',
                    orientacion: 'Orientación',
                    supizq: 'Sup. izquierda',
                    supder: 'Sup. derecha',
                    infder: 'Inf. derecha',
                    infizq: 'Inf. inzquierda',
                    inf: 'Inferior',
                    sup: 'Superior',
                    ver: 'Ver',
                    zoom: 'Zoom',
                    seleccionar: 'Seleccionar',
                    anadir: 'Añadir',
                    ayuda: 'Ayuda',
                    manual: 'Manual',
                    acercade: 'Acerca de',
                    zoom_in: 'Zoom +',
                    zoom_out: 'Zomm -',
                    refrescar: 'Refrescar',
                    anadir_a_croquis: 'Añadir vía a croquis',
                    editar_trazo: 'Editar trazo',
                    borrar_trazo: 'Borrar trazo'
                },
                leyenda: {
                    via: 'vía',
                    grado: 'grado',
                    longitud: 'longitud',
                    chapas: 'chapas'
                },
                alert: {
                    invitado: 'Inicia sesión para poder editar el croquis'
                }
            },

            modificaciones: {
                titulo: 'Últimos cambios',
                crear: {
                    zona: '{nombre} ha creado una nueva zona de escalada en "{region}"',
                    escuela: '{nombre} ha creado la escuela de "{escuela}"',
                    sector: '{nombre} ha creado el sector de "{sector}"',
                    croquis: '{nombre} ha creado un nuevo croquis del sector "{sector}" de la escuela "{escuela}"',
                    via: '{nombre} ha creado la vía "{via}"',
                    trazo_via: '{nombre} ha creado un trazo de la vía "{via}"'
                },
                actualizar: {
                    zona: '{nombre} ha actualizado la zona de escalada de "{region}"',
                    escuela: '{nombre} ha actualizado datos de la escuela de "{escuela}"',
                    sector: '{nombre} ha actualizado el sector de "{sector}"',
                    croquis: '{nombre} ha actualizado un croquis en el sector "{sector}" de la escuela "{escuela}"',
                    via: '{nombre} ha actualizado la vía "{via}"',
                    trazo_via: '{nombre} ha actualizado un trazo de la vía "{via}"'
                },
                borrar: {
                    zona: '{nombre} ha borrado la zona de "{region}"',
                    escuela: '{nombre} ha borrado la escuela de "{escuela}"',
                    sector: '{nombre} ha borrado el sector de "{sector}"',
                    croquis: '{nombre} ha borrado un croquis en el sector "{sector}" de la escuela "{escuela}"',
                    via: '{nombre} ha borrado la vía "{via}"',
                    trazo_via: '{nombre} ha borrado un trazo de la vía "{via}"'

                }
            },

            no_encontrado: {
                titulo: 'Recurso no encontrado',
                texto: 'Puede que lo que estés buscando ya no exista...'
            },

            error: {
                titulo: 'Error',
                texto: 'La aplicación se ha encontrado un fallo del que no ha podido recuperarse...'
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
                        texto: 'No se puede crear la nueva escuela: {msg}'
                    }
                },
                sector: {
                    titulo: 'Crear nuevo Sector',
                    nombre: 'Nombre',
                    informacion: 'Información',
                    creado: 'Sector creado con éxito',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear el nuevo sector: {msg}'
                    }
                },
                via: {
                    titulo: 'Crear nueva vía',
                    nombre: 'Nombre',
                    grado: 'Grado',
                    longitud: 'Longitud',
                    numero_chapas: 'Número de chapas',
                    validacion: {
                        longitud: 'Mayor que 0 y múltiplo de 0,25',
                        numero_chapas: 'Número no válido'
                    },
                    anadir_a_croquis: {
                        titulo: 'Añadir vía',
                        texto1: 'Selecciona la vía del sector que quieras añadir al croquis',
                        texto2: '¿No encuentras la vía? ',
                        texto_link: 'Créala nueva'
                    },
                    creada: 'Vía creada con éxito',
                    error: {
                        header: 'Error',
                        texto: 'No se puede crear la nueva vía: {msg}'
                    }
                },
                croquis: {
                    titulo: 'Añadir nuevo croquis',
                    nombre: 'Nombre',
                    imagen: 'Imagen',
                    browse_text: 'Examinar',
                    placeholder: 'Escoje o arrastra imagen...',
                    drop_placeholder: 'Suelta la imagen aquí',
                    error: {
                        imagen: 'Imagen no es válida',
                        header: 'Error',
                        texto: 'No se puede cargar el croquis: {msg}'
                    }
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