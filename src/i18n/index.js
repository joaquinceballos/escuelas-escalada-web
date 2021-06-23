import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
    es: {
        message: {

            ayuda: {
                header: 'Manual de usuario',
                titulo: 'Gestor gráfico',
                p1: 'Sección de ayuda de los aspectos básicos del editor gráfico.',
                exportar: {
                    titulo: 'Exportar',
                    p1: 'Podrás exportar una imágen del estado actual del croquis a tu dispositivo desde el menú haciendo click en ',
                    croquis: 'Croquis',
                    exportar: 'Exportar'
                },
                editar: {
                    titulo: 'Editar croquis',
                    p1: 'Las opciones de edición de croquis están reservadas a los usuarios registrados. Si eres  un usuario registrado deberás inicar sesión para desbloquearlas.',
                    anadir: {
                        titulo: 'Añadir vías al croquis',
                        p1a: 'Para dibujar el trazo de una vía del sector en el croquis, necesitas añadirla primero desde la opción ',
                        via: 'Vía',
                        anadir: 'Añadir',
                        p1b: ', o haciendo click en ',
                        p2: 'Si la vía que quieres añadir se encuentra en la lista, bastará con seleccionarla y pulsar Ok.',
                        p3: 'En el caso de que la vía que quieres dibujar no exista aún, podrás crearla nueva clickando en la opción correspondiente.',
                        p4: 'Una vez hayas añadido la vía al croquis, ésta estará seleccionada y ya podrás empezar a modificar el trazo para aproximarla a su ubicación en el sector.'
                    },
                    modificar: {
                        titulo: 'Modificar vías',
                        p1a: 'Editar el trazo de una vía existente en el croquis es sencillo. Primero deberás seleccionar la opción ',
                        via: 'Vía',
                        seleccionar: 'Seleccionar',
                        p1b: ' o clickando en ',
                        p1c: ', tras lo cual deberás hacer click sobre la vía que desees modificar.',
                        p2: 'Tras seleccionar la vía, esta mostrará los puntos que la componen, podrás añadir nuevos puntos clickando con el botón izquierdo sobre la misma vía, desplazar los existes pulsando y arrastrando con el botón izquierdo o borrarlos con el click derecho.',
                        p3a: 'Para borrar la vía deberás seleccionarla y hacer click en ',
                        p3b: '. Es importante tener claro que una vía que se borra del croquis sigue existiendo en el sector y puede añadirse de nuevo a cualquier croquis de éste. Para borrar una vía completamente de un sector deberá hacerse fuera del editor gráfico',
                        p4a: 'Una vez hayas terminado de editar el croquis, deberás guardar los cambios pulsando en ',
                        croquis: 'Croquis',
                        guardar: 'Guardar Cambios',
                        p4b: ', o en ',
                        p4c: '. Si cierras el editor sin guardar los cambios éstos se perderán.',
                        p5a: 'Si deseas descartar los cambios para dejar el croquis en el estado anterior a tus modificaciones pulsa en ',
                        edicion: 'Edición',
                        recargar: 'Recargar',
                        p5b: ' o en ',
                        p5c: ', tras lo cual todos los cambios no guardados serán deshechos.',
                    },
                    leyenda: {
                        titulo: 'Leyenda',
                        p1: 'La leyenda del croquis también puede ser modificada',
                        p2: 'Podrás escoger entre 3 tipos distintos de leyenda desde la opción ',
                        formato: 'Formato',
                        leyenda: 'Leyenda',
                        caja: 'Caja',
                        barra: 'Barra',
                        via: 'Vía',
                        p3: 'La opción "Vía" mostrará el nombre de la vía al inicio del trazo, las otras dos opciones, Caja y Barra, mostrarán la información completa de cada vía.',
                        p4: 'Además del tipo de leyenda podrás modificar la orientación para ajustarla mejor a tu croquis.'
                    }
                },
                zoom: {
                    titulo: 'Zoom',
                    p1a: 'Se puede aumentar el tamaño de la imagen del croquis desde la opcion ',
                    ver: 'Vista',
                    zoom: 'Zoom',
                    p1b: ' o clickando en ',
                    p2: 'El área de la imagen no será visible completamente en la ventana del editor, por lo que para moverte por todo el croquis deberás usar las barras de scroll vertical y horizontal dispuestas en los laterales inferior y derecho respectivamente.',
                    p3: 'También puedes desplazarte con la rueda del ratón. Moviendo la rueda para desplazimiento vertical y presionando ALT + rueda del ratón para el desplazamiento horizontal.'
                },
                salir: {
                    titulo: 'Salir',
                    p1: 'Puedes salir del editor en cualquier momento pero recuerda, si tienes cambios pendientes de guardar deberás confirmar la acción.'
                }
            },

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
                acercade: {
                    header: 'Escuelas de escalada',
                    titulo: 'Editor gráfico',
                    p1: 'Este editor forma parte del proyecto "Gestor Gráfico de Escuelas de Escalada" realizado por Joaquín Ceballos Gómez como TFG (Ingeniería Informática del Software).'
                },
                error: 'Error',
                registrado: {
                    titulo: 'Usuario registrado',
                    texto: 'Nuevo usuario creado correctamente, por favor haga login'
                },
                escuela: {
                    titulo_crear: 'Crear nueva escuela',
                    titulo_modificar: 'Modificar escuela',
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
                    titulo_crear: 'Crear nuevo sector',
                    titulo_modificar: 'Modificar sector',
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
                de: 'de',
                filas: 'Por página'
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
                },
                idioma: 'Idioma'
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
                },
                sin_resultados: 'Búsqueda sin resultados...'
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
                    escuelas: 'Sólo zonas con escuelas',
                    pais: 'País'
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
                },
                sin_escuelas: 'La zona todavía no tiene escuelas'
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
                    sin_sectores: 'La escuelas no tiene sectores todavía',
                    cierresTemporada: {
                        titulo: "Cierres de temporada",
                        texto: "Esta escuela está regulada con cierres temporales. Para conocer las fechas afectadas despliegue el calendario",
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
                    },

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
                    sin_vias: 'El sector no tiene vías todavía',
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
                    ver: 'Vista',
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

            ayuda: {
                header: 'User manual',
                titulo: 'Graphic manager',
                p1: 'Help section for the basics of the graphical editor.',
                exportar: {
                    titulo: 'Export',
                    p1: 'You can export an image of the current state of the sketch to your device from the menu by clicking on',
                    croquis: 'Sketch',
                    exportar: 'Export'
                },
                editar: {
                    titulo: 'Edit sketch',
                    p1: 'Sketch editing options are reserved for registered users. If you are a registered user you must log in to unblock them,',
                    anadir: {
                        titulo: 'Add route to sketch',
                        p1a: 'To draw the path of a sector path in the sketch, you need to add it first from the option',
                        via: 'Route',
                        anadir: 'Add',
                        p1b: ', or clicking in ',
                        p2: 'If the route you want to add is in the list, just select it and press Ok.',
                        p3: 'In the event that the route you want to draw does not yet exist, you can create a new one by clicking on the corresponding option.',
                        p4: 'Once you have added the route to the sketch, it will be selected and you can start modifying the line to approximate it to its location in the sector.'
                    },
                    modificar: {
                        titulo: 'Modify routes',
                        p1a: 'Editing the outline of an existing route in the sketch is easy. You must first select the option',
                        via: 'Route',
                        seleccionar: 'Select',
                        p1b: ' or clicking in ',
                        p1c: ', after which you must click on the route you wish to modify.',
                        p2: 'After selecting the route, it will show the points that compose it, you can add new points by clicking with the left button on the same route, move the existing ones by clicking and dragging with the left button or delete them with the right click.',
                        p3a: 'To delete the route you must select it and click on',
                        p3b: '. It is important to be clear that a way that is deleted from the sketch still exists in the sector and can be added back to any sketch in the sector. To completely delete a route from a sector, it must be done outside the graphic editor',
                        p4a: 'Once you have finished editing the sketch, you must save the changes by clicking on',
                        croquis: 'Sketch',
                        guardar: 'Save Changes',
                        p4b: ', or in ',
                        p4c: '. If you close the editor without saving the changes, they will be lost.',
                        p5a: 'If you want to discard the changes to leave the sketch in the state prior to your modifications, click on',
                        edicion: 'Editing',
                        recargar: 'Reload',
                        p5b: ' or in ',
                        p5c: ', after which all unsaved changes will be undone.',
                    },
                    leyenda: {
                        titulo: 'Leyend',
                        p1: 'The sketch legend can also be modified',
                        p2: 'You can choose between 3 different types of legend from the option',
                        formato: 'Format',
                        leyenda: 'Leyend',
                        caja: 'Box',
                        barra: 'Bar',
                        via: 'Route',
                        p3: 'The option "Way" will show the name of the way at the beginning of the trace, the other two options, Box and Bar, will show the complete information of each way.',
                        p4: 'In addition to the type of legend, you can modify the orientation to better fit your sketch.'
                    }
                },
                zoom: {
                    titulo: 'Zoom',
                    p1a: 'You can increase the size of the sketch image from the option',
                    ver: 'View',
                    zoom: 'Zoom',
                    p1b: ' or clicking in ',
                    p2: 'The image area will not be completely visible in the editor window, so to move through the entire sketch you will have to use the vertical and horizontal scroll bars arranged on the lower and right sides respectively.',
                    p3: 'You can also scroll with the mouse wheel. Rolling the wheel for vertical scrolling and pressing ALT + mouse wheel for horizontal scrolling.'
                },
                salir: {
                    titulo: 'Exit',
                    p1: 'You can exit the editor at any time but remember, if you have changes pending to save you must confirm the action.'
                }
            },

            app: {
                nombre: 'Climbing Areas'
            },

            idioma: {
                codigo: 'en'
            },

            formulario: {
                campo_obligatorio: 'Mandatory field',
                longitud_maxima: 'Maximum allowed: {0}',
            },

            home: {
                alert: {
                    token: 'Session has expired'
                }
            },

            login: {
                header: 'Climbing Areas - Login',
                username: 'Username / email',
                password: 'Password',
                entrar: 'Log-in',
                registrar: 'You do not have an account? Click here to register',
                obligatorio: 'Mandatory field',
                bienvenido: 'Welcome!',
                ko: {
                    header: 'Error',
                    texto: 'It was not possible to access with the username and password entered'
                },
                texto_registrar: 'Don\'t have an account?',
                texto_registrar_link: 'Create one'
            },

            register: {
                header: 'Climbing Areas - Register',
                username: 'User name',
                nombre: 'Name',
                apellido1: 'Surname',
                apellido2: 'Secod surname',
                apellido: 'Surname',
                email: 'Email',
                password: 'Password',
                submit: 'Register',
                texto_login: 'Already you have an account?',
                texto_login_link: 'Longin',
                pais: 'Country',
                obligatorio: 'Mandatory field',
                error: {
                    header: 'Error',
                    texto: 'Can\'t create new user: {msg}'
                }
            },

            modal: {
                acercade: {
                    header: 'Climbing Areas',
                    titulo: 'Graphic editor',
                    p1: 'This editor is part of the project "Graphic Manager of Climbing Schools" carried out by Joaquín Ceballos Gómez as a TFG (Computer Software Engineering).'
                },
                error: 'Error',
                registrado: {
                    titulo: 'Registered user',
                    texto: 'New user created successfully, please login'
                },
                escuela: {
                    titulo_crear: 'Create new climbing area',
                    titulo_modificar: 'Modify climbing area',
                    nombre: 'Area name',
                    informacion: 'information',
                    zona: 'Climbing Zone',
                    pais: 'country',
                    region: 'region',
                    creada: 'Area successfully created',
                    actualizada: 'Area successfully modified',
                    error: {
                        header: 'Error',
                        texto: 'Cannot create new area: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirm deletion of area',
                        texto: 'Area "{nombre}" will be permanently deleted along with all its sectors'
                    }
                },
                sector: {
                    titulo_crear: 'Create new sector',
                    titulo_modificar: 'Modify sector',
                    nombre: 'Name',
                    informacion: 'Information',
                    creado: 'Successfully created sector',
                    actualizado: 'Sector updated successfully',
                    posicion: 'Position',
                    error: {
                        header: 'Error',
                        texto: 'Cannot create new sector: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirm sector deletion',
                        texto: 'The sector "{nombre}" will be permanently deleted along with its routes and sketches'
                    },
                    horas_de_sol: 'Hours of sun',
                    inicio: 'From',
                    fin: 'To'
                },
                via: {
                    titulo_nueva: 'Create new route',
                    titulo_actualizar: 'Update route data',
                    nombre: 'Name',
                    grado: 'Grade',
                    longitud: 'Length',
                    numero_chapas: 'Number of bolts',
                    informacion: 'Information',
                    validacion: {
                        longitud: 'Greater than 0 and multiple of 0.25',
                        numero_chapas: 'Invalid number'
                    },
                    anadir_a_croquis: {
                        titulo: 'Add route',
                        texto1: 'Select the sector route you want to add to the sketch',
                        texto2: 'Can\'t find the route? ',
                        texto_link: 'Create it new'
                    },
                    creada: 'Route created correctly',
                    actualizada: 'Route updated correctly',
                    error: {
                        header: 'Error',
                        texto: 'Cannot create new route: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirm route deletion',
                        texto: 'The path {nombre} will be permanently deleted'
                    }
                },
                croquis: {
                    titulo: 'Add new sketch',
                    nombre: 'Name',
                    imagen: 'Image',
                    browse_text: 'Browse',
                    placeholder: 'Choose or drag image ...',
                    drop_placeholder: 'Drop the image here',
                    error: {
                        imagen: 'Image is invalid',
                        header: 'Error',
                        texto: 'Cannot load sketch: {msg}'
                    },
                    borrar: {
                        titulo: 'Confirm Sketch Delete',
                        texto: 'The sketch will be erased including the image and the track lines drawn on it.'
                    }
                },
                ascension: {
                    header: 'New ascension',
                    fecha: 'Date',
                    grado: 'Grade',
                    comentario: 'Comment',
                    registrada: 'Ascension registered!',
                    ko: {
                        header: 'Error',
                        texto: 'Error registering ascension {msg}'
                    }

                },
                cierres: {
                    titulo: 'New seasonal lock',
                    inicio: 'From',
                    fin: 'To',
                    motivo: 'Reason',
                    obligatorio: 'Mandatory field',
                    rango: 'Invalid date range',
                    combo: {
                        CRIA_AVES: 'Breeding birds',
                        OTROS: 'Other reason'
                    },
                    borrar: {
                        titulo: 'Confirm deletion of seasonal lock',
                        texto: 'Delete the seasonal lock by reason "{motivo}" from {inicio} to {fin}?'
                    },
                    error: {
                        header: 'Error',
                        texto: 'Error registering seasonal lock: {msg}'
                    }
                },
                zona: {
                    titulo_nueva: 'Create new zone',
                    titulo_actualizar: 'Update zone',
                    pais: 'Country',
                    visible: 'Visible',
                    region: 'Region',
                    url_imagen: 'Image URL',
                    informacion: 'information',
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
                previo: 'previous',
                siguiente: 'next',
                de: 'of',
                filas: 'Per page'
            },

            navbar: {
                inicio: "Home",
                zonas: 'Zones',
                admin: 'Admin',
                busqueda: {
                    placeholder: 'Search'
                },
                usuario: {
                    perfil: 'Profile',
                    logout: 'logout',
                    login: 'login'
                },
                idioma: 'Language'
            },

            resultados: {
                escuelas: {
                    titulo: 'Climbing areas'
                },
                sectores: {
                    titulo: 'Sectors'
                },
                vias: {
                    titulo: 'Routes'
                },
                sin_resultados: 'No results found...'
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

            zona: {
                titulo: 'Climbing zones',
                filtropais: {
                    texto: 'Select country'
                },
                tabla: {
                    region: 'region',
                    pais: 'country',
                    nescuelas: '#Areas',
                    nvias: '#Routes'
                },
                anadir_escuela: 'Add area',
                listado_escuelas: 'List of Areas',
                filtro: {
                    escuelas: 'Show only with areas',
                    pais: 'Country'
                },
                detalle: {
                    zona: {
                        ficha: 'detail',
                        pais: 'Country',
                        numero_escuelas: 'Number of areas',
                        visible: {
                            texto: 'Visible',
                            si: 'Yes',
                            no: 'No'
                        },
                        editar: 'update zone'
                    }
                },
                sin_escuelas: 'The zone has no areas yet'
            },

            zonas: {
                anadir_zona: 'Add zone'
            },

            escuela: {
                tabla: {
                    nombre: 'Name',
                    pais: 'Country',
                    nsectores: '#Sectors',
                    nvias: '#Routes'
                },

                detalle: {
                    sectores: "Area sectors",
                    anadir_sector: 'Add sector',
                    sin_sectores: 'The area has no sectors yet',
                    cierresTemporada: {
                        titulo: "Seasonal locks",
                        texto: "This school is regulated with temporary locks. To know the affected dates, display the calendar",
                        botoninfo: "more information",
                        tipo: {
                            CRIA_AVES: {
                                texto: "Seasonal breeding of nesting birds"
                            },
                            OTROS: {
                                texto: "Other unspecified reasons"
                            }
                        },
                        anadir: 'Add seasonal lock',
                        motivo: {
                            CRIA_AVES: "Seasonal breeding of nesting birds",
                            OTROS: 'Other unspecified reasons'
                        },
                        inicio: 'from',
                        fin: 'to'
                    },
                    escuela: {
                        ficha: 'Details',
                        zona: 'Zone',
                        numero_sectores: 'Number of sectors',
                        editar: 'Modify area'
                    },

                }
            },

            sector: {
                tabla: {
                    nombre: 'Name',
                    escuela: 'Area',
                    nvias: '#Routes'
                },
                detalle: {
                    listado_vias: 'Routes',
                    listado_croquis: 'Sketches',
                    sin_vias: 'The sectors has no routes yet',
                    anadir_via: 'Add route',
                    tooltip_croquis: 'Add new sketch',
                    ascensiones: {
                        titulo: 'Ascensions',
                        anadir: 'Add your ascension'
                    },
                    via: {
                        longitud: 'Length',
                        numeroChapas: 'Number of bolts',
                        grado: 'Grade',
                        informacion: 'Information',
                        editar: 'Update route data',
                        ficha: 'Details',
                        metros: 'meters'
                    },
                    sector: {
                        editar: 'Modify sector',
                        ficha: 'Detail',
                        escuela: 'Area',
                        nombre: 'Name',
                        numero_vias: 'Number of routes',
                        informacion: 'Information',
                        ubicacion: 'Location',
                        latitud: 'latitude',
                        longitud: 'longitude',
                        horas_de_sol: {
                            titulo: 'Hours of sun',
                            texto: 'Approximate hours when the sun hits the hardest',
                            inicio: 'from',
                            fin: 'to',
                            sin_info: 'No information recorded on hours of sunshine'
                        }
                    }
                }
            },

            via: {
                tabla: {
                    nombre: 'Name',
                    escuela: 'area',
                    grado: 'grade',
                    longitud: 'Length',
                    numero_chapas: '#bolts'
                }
            },

            croquis: {
                context_menu: {
                    borrar_punto: "delete point"
                },
                toolbar: {
                    croquis: 'Sketch',
                    guardar_cambios: "Save changes",
                    exportar: 'Export',
                    salir: 'Exit',
                    edicion: 'Edit',
                    recargar: 'Reload',
                    formato: 'Format',
                    leyenda: 'Leyend',
                    tipo: 'Type',
                    caja: 'Box',
                    barra: 'Bar',
                    via: 'Route',
                    orientacion: 'Orientation',
                    supizq: 'Top left',
                    supder: 'Top right',
                    infder: 'Bottom right',
                    infizq: 'Bottom left',
                    inf: 'Bottom',
                    sup: 'Top',
                    ver: 'View',
                    zoom: 'Zoom',
                    seleccionar: 'Select',
                    anadir: 'Add',
                    ayuda: 'Help',
                    manual: 'Manual',
                    acercade: 'About',
                    zoom_in: 'Zoom +',
                    zoom_out: 'Zomm -',
                    refrescar: 'Refresh',
                    anadir_a_croquis: 'Add route to croquis',
                    editar_trazo: 'Edit line',
                    borrar_trazo: 'Delete line'
                },

                leyenda: {
                    via: 'route',
                    grado: 'grade',
                    longitud: 'length',
                    chapas: 'bolts'
                },
                alert: {
                    invitado: 'Login to be able to edit the sketch'
                }
            },

            modificaciones: {
                titulo: 'Last changes',

                crear: {
                    zona: '{nombre} has created a new climbing zone in "{region}"',
                    escuela: '{nombre} has created a new climbing area "{escuela}"',
                    sector: '{nombre} has created the sector of "{sector}"',
                    croquis: '{nombre} has created a new sketch of the sector "{sector}" dof the area "{escuela}"',
                    via: '{nombre} has created the route "{via}"',
                    trazo_via: '{nombre} has created the route line "{via}"'
                },

                actualizar: {
                    zona: '{nombre} has updated the climbing zone of "{region}"',
                    escuela: '{nombre} has updated the area of "{escuela}"',
                    sector: '{nombre} has updated the sector "{sector}"',
                    croquis: '{nombre} has updated the sketch of the sector "{sector}" of the area "{escuela}"',
                    via: '{nombre} has updated the route "{via}"',
                    trazo_via: '{nombre} has updated the route line "{via}"'
                },

                borrar: {
                    zona: '{nombre} has deleted the climbing zone of "{region}"',
                    escuela: '{nombre} ha borrado la escuela de "{escuela}"',
                    sector: '{nombre} ha borrado el sector de "{sector}"',
                    croquis: '{nombre} ha borrado un croquis en el sector "{sector}" de la escuela "{escuela}"',
                    via: '{nombre} ha borrado la vía "{via}"',
                    trazo_via: '{nombre} ha borrado un trazo de la vía "{via}"'

                }
            },

            no_encontrado: {
                titulo: 'Resource not found',
                texto: 'What you are looking for may no longer exist ...'
            },

            error: {
                titulo: 'Error',
                texto: 'The application has encountered a crash from which it has not been able to recover ...'
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